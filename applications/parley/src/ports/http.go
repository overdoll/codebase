package ports

import (
	"net/http"

	"overdoll/applications/parley/src/app"
	gen "overdoll/applications/parley/src/ports/graphql"
	"overdoll/libraries/graphql"
	"overdoll/libraries/router"
)

type GraphQLServer struct {
	app app.Application
}

func NewGraphQLServer(app *app.Application) http.Handler {
	rtr := router.NewGinRouter()

	rtr.POST("/graphql", graphql.HandleGraphQL(gen.NewExecutableSchema(gen.Config{
		Resolvers: gen.NewResolver(app),
	})))

	return rtr
}
