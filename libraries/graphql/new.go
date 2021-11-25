package graphql

import (
	"context"
	"errors"
	"overdoll/libraries/helpers"

	"github.com/99designs/gqlgen/graphql"
	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/handler/apollotracing"
	"github.com/99designs/gqlgen/graphql/handler/extension"
	"github.com/99designs/gqlgen/graphql/handler/lru"
	"github.com/99designs/gqlgen/graphql/handler/transport"
	"github.com/gin-gonic/gin"
	"github.com/vektah/gqlparser/v2/gqlerror"
	"go.uber.org/zap"
)

func HandleGraphQL(schema graphql.ExecutableSchema) gin.HandlerFunc {
	return func(c *gin.Context) {
		graphAPIHandler := handler.New(schema)

		// set default error presenter to show 'internal server error'
		graphAPIHandler.SetErrorPresenter(func(ctx context.Context, e error) *gqlerror.Error {
			// notify bug tracker?

			err := graphql.DefaultErrorPresenter(ctx, e)

			zap.S().Error("resolver failed ", err)

			if !helpers.IsDebug() {
				err.Message = "internal server error"
			}

			return err
		})

		graphAPIHandler.SetRecoverFunc(func(ctx context.Context, err interface{}) error {
			// notify bug tracker?
			zap.S().Error("resolver failed ", err)

			return errors.New("internal server error")
		})

		graphAPIHandler.Use(apollotracing.Tracer{})

		if helpers.IsDebug() {
			graphAPIHandler.Use(extension.Introspection{})
		}

		graphAPIHandler.AddTransport(transport.POST{})

		graphAPIHandler.SetQueryCache(lru.New(1000))

		// Query complexity limit
		graphAPIHandler.ServeHTTP(c.Writer, c.Request)
	}
}
