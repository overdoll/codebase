package ports

import (
	"context"
	"net/http"
	"overdoll/applications/loader/internal/app"
	gen "overdoll/applications/loader/internal/ports/graphql"
	"overdoll/applications/loader/internal/ports/graphql/dataloader"

	"github.com/gin-gonic/gin"
	tusd "github.com/tus/tusd/pkg/handler"
	"go.temporal.io/sdk/client"
	"go.uber.org/zap"
	"overdoll/libraries/graphql"
	"overdoll/libraries/router"
)

type GraphQLServer struct {
	app *app.Application
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

	// graphql
	rtr.POST("/api/graphql",
		dataLoaderToContext(app),
		graphql.HandleGraphQL(gen.NewExecutableSchema(gen.Config{
			Resolvers: gen.NewResolver(app, client),
		})),
	)

	composer, err := app.Commands.TusComposer.Handle(context.Background())

	if err != nil {
		zap.S().Fatal("failed to get composer ", zap.Error(err))
	}

	handler, err := tusd.NewUnroutedHandler(tusd.Config{
		BasePath:                "/api/upload/",
		StoreComposer:           composer,
		RespectForwardedHeaders: true,
	})

	if err != nil {
		zap.S().Fatal("failed to create handler ", zap.Error(err))
	}

	rtr.POST("/api/upload/", gin.WrapH(http.StripPrefix("/api/upload/", handler.Middleware(http.HandlerFunc(handler.PostFile)))))
	rtr.HEAD("/api/upload/:id", gin.WrapH(http.StripPrefix("/api/upload/", handler.Middleware(http.HandlerFunc(handler.HeadFile)))))
	rtr.PATCH("/api/upload/:id", gin.WrapH(http.StripPrefix("/api/upload/", handler.Middleware(http.HandlerFunc(handler.PatchFile)))))
	rtr.GET("/api/upload/:id", gin.WrapH(http.StripPrefix("/api/upload/", handler.Middleware(http.HandlerFunc(handler.GetFile)))))

	if composer.UsesTerminater {
		rtr.DELETE("/api/upload/:id", gin.WrapH(http.StripPrefix("/api/upload/", handler.Middleware(http.HandlerFunc(handler.DelFile)))))
	}

	return rtr
}
