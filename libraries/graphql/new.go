package graphql

import (
	"context"
	"github.com/99designs/gqlgen/graphql"
	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/handler/apollotracing"
	"github.com/99designs/gqlgen/graphql/handler/extension"
	"github.com/99designs/gqlgen/graphql/handler/lru"
	"github.com/99designs/gqlgen/graphql/handler/transport"
	"github.com/getsentry/sentry-go"
	"github.com/gin-gonic/gin"
	"github.com/vektah/gqlparser/v2/gqlerror"
	"go.uber.org/zap"
	"overdoll/libraries/errors"
	domainerror2 "overdoll/libraries/errors/domainerror"
	"overdoll/libraries/sentry_support"
	"overdoll/libraries/support"
	"overdoll/libraries/zap_support"
)

func HandleGraphQL(schema graphql.ExecutableSchema) gin.HandlerFunc {
	return func(c *gin.Context) {
		graphAPIHandler := handler.New(schema)

		// set default error presenter to show 'internal server error'
		graphAPIHandler.SetErrorPresenter(func(ctx context.Context, e error) *gqlerror.Error {

			defaultMessage := ""
			isSafeToView := false

			switch e.(type) {
			case *domainerror2.Validation:
				isSafeToView = true
				defaultMessage = "validation error"
			case *domainerror2.Authorization:
				isSafeToView = true
				defaultMessage = "not authorized"
			default:
				unwrappedError := errors.Unwrap(e)
				zap.S().Errorw("resolver error", zap.Error(unwrappedError))
				defaultMessage = "internal server error"
				sentry_support.CaptureException(ctx, unwrappedError)
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
			sentry_support.Recover(ctx, err)
			zap_support.SafePanic("panic while running grpc", zap.Any("stack", err))
			return errors.New("unrecoverable server error")
		})

		graphAPIHandler.Use(apollotracing.Tracer{})

		// introspection is always allowed because these individual services are never actually exposed
		graphAPIHandler.Use(extension.Introspection{})

		// add sentry data as breadcrumbs
		graphAPIHandler.AroundOperations(func(ctx context.Context, next graphql.OperationHandler) graphql.ResponseHandler {
			oc := graphql.GetOperationContext(ctx)
			if hub := sentry.GetHubFromContext(ctx); hub != nil {
				hub.Scope().SetTag("kind", oc.OperationName)
				hub.Scope().SetExtra("query", oc.RawQuery)
			}

			return next(ctx)
		})

		graphAPIHandler.AddTransport(transport.POST{})

		graphAPIHandler.SetQueryCache(lru.New(1000))

		// Query complexity limit
		graphAPIHandler.ServeHTTP(c.Writer, c.Request)
	}
}
