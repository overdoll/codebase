package ports

import (
	"context"
	"net/http"
	"overdoll/applications/hades/internal/app"
	"overdoll/applications/hades/internal/ports/ccbill_webhook"
	gen "overdoll/applications/hades/internal/ports/graphql"

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

func NewHttpServer(app *app.Application) http.Handler {

	rtr := router.NewGinRouter()

	rtr.Use(principal.GinPrincipalRequestMiddleware(GraphQLServer{app: app}))

	// graphql
	rtr.POST("/api/graphql",
		graphql.HandleGraphQL(gen.NewExecutableSchema(gen.Config{
			Resolvers: gen.NewResolver(app),
		})),
	)

	rtr.POST("/api/ccbill-webhook", ccbill_webhook.CCBillWebhook(app))

	return rtr
}
