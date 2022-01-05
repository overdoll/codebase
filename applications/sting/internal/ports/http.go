package ports

import (
	"context"
	"net/http"

	"go.temporal.io/sdk/client"
	"overdoll/applications/sting/internal/app"
	gen "overdoll/applications/sting/internal/ports/graphql"
	"overdoll/libraries/graphql"
	"overdoll/libraries/principal"
	"overdoll/libraries/router"
)

type GraphQLServer struct {
	app *app.Application
}

func (s GraphQLServer) PrincipalById(ctx context.Context, id string) (*principal.Principal, error) {

	acc, err := s.app.Queries.PrincipalById.Handle(ctx, id)

	if err != nil {
		return nil, err
	}

	return acc, nil
}

func NewHttpServer(app *app.Application, client client.Client) http.Handler {

	rtr := router.NewGinRouter()

	rtr.Use(principal.GinPrincipalRequestMiddleware(GraphQLServer{app: app}))

	// graphql
	rtr.POST("/api/graphql",
		graphql.HandleGraphQL(gen.NewExecutableSchema(gen.Config{
			Resolvers: gen.NewResolver(app, client),
		})),
	)

	return rtr
}
