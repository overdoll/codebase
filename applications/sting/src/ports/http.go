package ports

import (
	"net/http"

	"overdoll/applications/sting/src/app"
	gen "overdoll/applications/sting/src/ports/graphql"
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
