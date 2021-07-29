package ports

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"go.uber.org/zap"
	"overdoll/applications/parley/internal/app"
	gen "overdoll/applications/parley/internal/ports/graphql"
	"overdoll/libraries/graphql"
	"overdoll/libraries/passport"
	"overdoll/libraries/principal"
	"overdoll/libraries/router"
)

type GraphQLServer struct {
	app app.Application
}

// parley implementation of principal
func principalToContext(app *app.Application) gin.HandlerFunc {
	return func(c *gin.Context) {

		ctx := c.Request.Context()

		if err := passport.FromContext(ctx).Authenticated(); err != nil {
			c.Next()
			return
		}

		acc, err := app.Queries.PrincipalById.Handle(ctx, passport.FromContext(ctx).AccountID())

		if err != nil {
			zap.S().Error("unable to get account ", zap.Error(err))
			c.JSON(401, principal.ErrNotAuthorized)
			c.Abort()
			return
		}

		c.Request = principal.AddPrincipalToRequest(c, acc)
		c.Next()
	}
}

func NewGraphQLServer(app *app.Application) http.Handler {
	rtr := router.NewGinRouter()

	rtr.POST("/graphql", principalToContext(app), graphql.HandleGraphQL(gen.NewExecutableSchema(gen.Config{
		Resolvers: gen.NewResolver(app),
	})))

	return rtr
}
