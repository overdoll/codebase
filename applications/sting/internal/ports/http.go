package ports

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"go.temporal.io/sdk/client"
	"go.uber.org/zap"
	"overdoll/applications/sting/internal/app"
	gen "overdoll/applications/sting/internal/ports/graphql"
	"overdoll/libraries/graphql"
	"overdoll/libraries/passport"
	"overdoll/libraries/principal"
	"overdoll/libraries/router"
)

// Sting implementation of principal
// logic is largely the same, but will use a custom query
func principalToContext(app *app.Application) gin.HandlerFunc {
	return func(c *gin.Context) {

		ctx := c.Request.Context()

		if !passport.FromContext(ctx).IsAuthenticated() {
			c.Next()
			return
		}

		acc, err := app.Queries.PrincipalById.Handle(ctx, passport.FromContext(ctx).AccountID())

		if err != nil {
			zap.S().Error("unable to get account", zap.Error(err))
			c.Status(http.StatusUnauthorized)
			return
		}

		c.Request = principal.AddPrincipalToRequest(c, acc)
		c.Next()
	}
}

func NewGraphQLServer(app *app.Application, client client.Client) http.Handler {
	rtr := router.NewGinRouter()

	rtr.POST("/graphql", principalToContext(app), graphql.HandleGraphQL(gen.NewExecutableSchema(gen.Config{
		Resolvers: gen.NewResolver(app, client),
	})))

	return rtr
}
