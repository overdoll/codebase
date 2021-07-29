package ports

import (
	"context"

	"github.com/gin-gonic/gin"
	"go.uber.org/zap"
	"overdoll/applications/eva/internal/app"
	"overdoll/applications/eva/internal/domain/account"
	gen "overdoll/applications/eva/internal/ports/graphql"
	"overdoll/applications/eva/internal/ports/graphql/dataloader"
	"overdoll/libraries/graphql"
	"overdoll/libraries/passport"
	"overdoll/libraries/principal"
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

// Eva implementation of principal.
// will grab directly from it's own database and convert the account to a principal
func principalToContext(app *app.Application) gin.HandlerFunc {
	return func(c *gin.Context) {

		ctx := c.Request.Context()

		if err := passport.FromContext(ctx).Authenticated(); err != nil {
			c.Next()
			return
		}

		acc, err := app.Queries.AccountById.Handle(ctx, passport.FromContext(ctx).AccountID())

		if err != nil {
			zap.S().Error("unable to get account ", zap.Error(err))
			c.JSON(401, principal.ErrNotAuthorized)
			c.Abort()
			return
		}

		c.Request = principal.AddPrincipalToRequest(c, account.ToPrincipal(acc))
		c.Next()
	}
}

func NewGraphQLServer(app *app.Application) *gin.Engine {
	rtr := router.NewGinRouter()

	rtr.POST("/graphql", dataLoaderToContext(app), principalToContext(app), graphql.HandleGraphQL(gen.NewExecutableSchema(gen.Config{
		Resolvers: gen.NewResolver(app),
	})))

	return rtr
}
