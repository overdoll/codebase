package ports

import (
	"context"
	"net/http"

	"github.com/gin-gonic/gin"
	tusd "github.com/tus/tusd/pkg/handler"
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

func NewHttpServer(app *app.Application, client client.Client) http.Handler {
	rtr := router.NewGinRouter()

	// graphql
	rtr.POST("/graphql", principalToContext(app), graphql.HandleGraphQL(gen.NewExecutableSchema(gen.Config{
		Resolvers: gen.NewResolver(app, client),
	})))

	// tusd
	composer, err := app.Commands.TusComposer.Handle(context.Background())

	if err != nil {
		zap.S().Fatal("failed to get composer ", zap.Error(err))
	}

	handler, err := tusd.NewHandler(tusd.Config{
		BasePath:                "/upload/",
		StoreComposer:           composer,
		RespectForwardedHeaders: true,
	})

	if err != nil {
		zap.S().Fatal("failed to create handler ", zap.Error(err))
	}

	rtr.POST("/upload", gin.WrapF(handler.PostFile))
	rtr.HEAD("/upload/:id", gin.WrapF(handler.HeadFile))
	rtr.PATCH("/upload/:id", gin.WrapF(handler.PatchFile))
	rtr.GET("/upload/:id", gin.WrapF(handler.GetFile))

	return rtr
}
