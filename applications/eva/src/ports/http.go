package ports

import (
	"github.com/gin-gonic/gin"
	"overdoll/applications/eva/src/app"
	gen "overdoll/applications/eva/src/ports/graphql"
	"overdoll/libraries/graphql"
	"overdoll/libraries/router"
)

type GraphQLServer struct {
	app *app.Application
}

func NewGraphQLServer(app *app.Application) *gin.Engine {
	rtr := router.NewGinRouter()

	rtr.POST("/graphql", graphql.HandleGraphQL(gen.NewExecutableSchema(gen.Config{
		Resolvers: gen.NewResolver(app),
	})))

	return rtr
}
