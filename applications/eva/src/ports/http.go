package ports

import (
	"context"

	"github.com/gin-gonic/gin"
	"overdoll/applications/eva/src/app"
	gen "overdoll/applications/eva/src/ports/graphql"
	"overdoll/applications/eva/src/ports/graphql/dataloader"
	"overdoll/libraries/graphql"
	"overdoll/libraries/router"
)

type GraphQLServer struct {
	app *app.Application
}

func dataLoaderToContext(app *app.Application) gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx := context.WithValue(c.Request.Context(), graphql.DataLoaderKey, dataloader.NewLoader(app))
		c.Request = c.Request.WithContext(ctx)
		c.Next()
	}
}

func NewGraphQLServer(app *app.Application) *gin.Engine {
	rtr := router.NewGinRouter()

	rtr.POST("/graphql", dataLoaderToContext(app), graphql.HandleGraphQL(gen.NewExecutableSchema(gen.Config{
		Resolvers: gen.NewResolver(app),
	})))

	return rtr
}
