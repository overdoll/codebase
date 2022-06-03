package ports

import (
	"context"
	"github.com/gin-gonic/gin"
	"overdoll/applications/eva/internal/app"
	"overdoll/applications/eva/internal/domain/account"
	gen "overdoll/applications/eva/internal/ports/graphql"
	"overdoll/applications/eva/internal/ports/graphql/dataloader"
	"overdoll/libraries/graphql"
	"overdoll/libraries/principal"
	"overdoll/libraries/router"
)

type GraphQLServer struct {
	app *app.Application
}

func (s GraphQLServer) PrincipalById(ctx context.Context, id string) (*principal.Principal, error) {

	acc, err := s.app.Queries.AccountById.Handle(ctx, id)

	if err != nil {
		return nil, err
	}

	return account.ToPrincipal(acc), nil
}

func dataLoaderToContext(app *app.Application) gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx := context.WithValue(c.Request.Context(), graphql.DataLoaderKey, dataloader.NewDataLoader(app))
		c.Request = c.Request.WithContext(ctx)
		c.Next()
	}
}

func NewHttpServer(app *app.Application) *gin.Engine {

	rtr := router.NewGinRouter(GraphQLServer{app: app})

	rtr.POST("/api/graphql",
		dataLoaderToContext(app),
		graphql.HandleGraphQL(gen.NewExecutableSchema(gen.Config{
			Resolvers: gen.NewResolver(app),
		})),
	)

	return rtr
}
