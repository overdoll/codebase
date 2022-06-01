package graphql

import (
	"context"
	"errors"
	"github.com/99designs/gqlgen/graphql"
	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/handler/apollotracing"
	"github.com/99designs/gqlgen/graphql/handler/extension"
	"github.com/99designs/gqlgen/graphql/handler/lru"
	"github.com/99designs/gqlgen/graphql/handler/transport"
	"github.com/getsentry/sentry-go"
	sentrygin "github.com/getsentry/sentry-go/gin"
	"github.com/gin-gonic/gin"
	"github.com/vektah/gqlparser/v2/gqlerror"
	"go.uber.org/zap"
	"overdoll/libraries/domainerror"
	"overdoll/libraries/support"
)

func HandleGraphQL(schema graphql.ExecutableSchema) gin.HandlerFunc {
	return func(c *gin.Context) {
		graphAPIHandler := handler.New(schema)

		// set default error presenter to show 'internal server error'
		graphAPIHandler.SetErrorPresenter(func(ctx context.Context, e error) *gqlerror.Error {

			defaultMessage := ""
			isSafeToView := false

			switch e.(type) {
			case *domainerror.Validation:
				isSafeToView = true
				defaultMessage = "validation error"
			case *domainerror.Authorization:
				isSafeToView = true
				defaultMessage = "not authorized"
			default:
				zap.S().Errorw("resolver error", zap.Error(e))
				defaultMessage = "internal server error"
				// capture if it's an internal server error
				if hub := sentrygin.GetHubFromContext(c); hub != nil {
					hub.WithScope(func(scope *sentry.Scope) {
						defer hub.CaptureException(e)
					})
				}
			}

			err := graphql.DefaultErrorPresenter(ctx, e)

			if isSafeToView || support.IsDebug() {
				err.Message = defaultMessage + ": " + err.Message
			} else {
				err.Message = defaultMessage
			}

			return err
		})

		graphAPIHandler.SetRecoverFunc(func(ctx context.Context, err interface{}) error {

			if hub := sentrygin.GetHubFromContext(c); hub != nil {
				hub.WithScope(func(scope *sentry.Scope) {
					defer hub.RecoverWithContext(ctx, err)
				})
			}

			zap.S().Errorw("resolver panic", zap.Any("panic", err))
			return errors.New("internal server error")
		})

		graphAPIHandler.Use(apollotracing.Tracer{})

		// introspection is always allowed because these individual services are never actually exposed
		graphAPIHandler.Use(extension.Introspection{})

		// add sentry data as breadcrumbs
		graphAPIHandler.AroundOperations(func(ctx context.Context, next graphql.OperationHandler) graphql.ResponseHandler {
			oc := graphql.GetOperationContext(ctx)
			if hub := sentry.GetHubFromContext(ctx); hub != nil {
				hub.WithScope(func(scope *sentry.Scope) {
					scope.SetTag("kind", oc.OperationName)
					scope.SetExtra("query", oc.RawQuery)
				})
			}

			return next(ctx)
		})

		graphAPIHandler.AddTransport(transport.POST{})

		graphAPIHandler.SetQueryCache(lru.New(1000))

		// Query complexity limit
		graphAPIHandler.ServeHTTP(c.Writer, c.Request)
	}
}
