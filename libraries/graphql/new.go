package graphql

import (
	"github.com/99designs/gqlgen/graphql"
	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/handler/apollotracing"
	"github.com/99designs/gqlgen/graphql/handler/extension"
	"github.com/99designs/gqlgen/graphql/handler/lru"
	"github.com/99designs/gqlgen/graphql/handler/transport"
	"github.com/gin-gonic/gin"
	"overdoll/libraries/sentry_support"
)

func HandleGraphQL(schema graphql.ExecutableSchema) gin.HandlerFunc {
	return func(c *gin.Context) {
		graphAPIHandler := handler.New(schema)

		// set default error presenter to show 'internal server error'
		graphAPIHandler.SetErrorPresenter(sentry_support.GraphQLErrorPresenter)

		graphAPIHandler.SetRecoverFunc(sentry_support.GraphQLRecoverFunc)

		graphAPIHandler.Use(apollotracing.Tracer{})

		// introspection is always allowed because these individual services are never actually exposed
		graphAPIHandler.Use(extension.Introspection{})

		// add sentry data as breadcrumbs
		graphAPIHandler.AroundOperations(sentry_support.GraphQLAroundOperations)

		graphAPIHandler.AddTransport(transport.POST{})

		graphAPIHandler.SetQueryCache(lru.New(1000))

		// Query complexity limit
		graphAPIHandler.ServeHTTP(c.Writer, c.Request)
	}
}
