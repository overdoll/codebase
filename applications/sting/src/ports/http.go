package ports

import (
	"net/http"

	"go.temporal.io/sdk/client"
	"overdoll/applications/sting/src/app"
	gen "overdoll/applications/sting/src/ports/graphql"
	"overdoll/libraries/graphql"
	"overdoll/libraries/router"
)

func NewGraphQLServer(app *app.Application, client client.Client) http.Handler {
	rtr := router.NewGinRouter()

	rtr.POST("/graphql", graphql.HandleGraphQL(gen.NewExecutableSchema(gen.Config{
		Resolvers: gen.NewResolver(app, client),
		Directives: gen.DirectiveRoot{
			Auth: graphql.Auth,
		},
	})))

	return rtr
}
