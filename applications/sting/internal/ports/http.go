package ports

import (
	"context"
	"github.com/gin-gonic/gin"
	"net/http"
	"os"
	"overdoll/applications/sting/internal/app"
	gen "overdoll/applications/sting/internal/ports/graphql"
	"overdoll/applications/sting/internal/ports/graphql/dataloader"
	"overdoll/applications/sting/internal/ports/rest"
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

func secureSearchRequest() gin.HandlerFunc {
	return func(c *gin.Context) {

		if c.Request.Header.Get("X-overdoll-Search-Authorization") != os.Getenv("SEARCH_AUTHORIZATION_KEY") {
			c.AbortWithStatus(http.StatusUnauthorized)
			return
		}

		c.Next()
	}
}

func NewHttpServer(app *app.Application) http.Handler {

	rtr := router.NewGinRouter(GraphQLServer{app: app})

	rtr.Use(dataLoaderToContext(app))

	// graphql
	rtr.POST("/api/graphql",
		graphql.HandleGraphQL(gen.NewExecutableSchema(gen.Config{
			Resolvers: gen.NewResolver(app),
		})),
	)

	// ecchi bot search
	rtr.GET("/api/search/v1/ecchi-bot",
		secureSearchRequest(),
		rest.GetEcchiSearch(app),
	)

	return rtr
}
