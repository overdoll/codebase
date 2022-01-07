package ports

import (
	"context"
	"github.com/gin-gonic/gin"
	"net/http"
	"overdoll/applications/stella/internal/app"
	gen "overdoll/applications/stella/internal/ports/graphql"
	"overdoll/applications/stella/internal/ports/graphql/dataloader"

	"go.temporal.io/sdk/client"

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

func dataLoaderToContext(app *app.Application) gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx := context.WithValue(c.Request.Context(), graphql.DataLoaderKey, dataloader.NewDataLoader(app))
		c.Request = c.Request.WithContext(ctx)
		c.Next()
	}
}

func NewHttpServer(app *app.Application, client client.Client) http.Handler {

	rtr := router.NewGinRouter()

	rtr.Use(dataLoaderToContext(app))
	rtr.Use(principal.GinPrincipalRequestMiddleware(GraphQLServer{app: app}))

	// graphql
	rtr.POST("/api/graphql",
		graphql.HandleGraphQL(gen.NewExecutableSchema(gen.Config{
			Resolvers: gen.NewResolver(app, client),
		})),
	)

	return rtr
}
