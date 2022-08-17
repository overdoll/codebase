package ports

import (
	"context"
	"github.com/gin-gonic/gin"
	tusd "github.com/tus/tusd/pkg/handler"
	"go.uber.org/zap"
	"net/http"
	"overdoll/applications/loader/internal/app"
	gen "overdoll/applications/loader/internal/ports/graphql"
	"overdoll/applications/loader/internal/ports/graphql/dataloader"
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

func NewHttpServer(app *app.Application) http.Handler {

	rtr := router.NewGinRouter(nil)

	rtr.Use(dataLoaderToContext(app))

	// graphql
	rtr.POST("/api/graphql",
		graphql.HandleGraphQL(gen.NewExecutableSchema(gen.Config{
			Resolvers: gen.NewResolver(app),
		})),
	)

	composer, err := app.Commands.TusComposer.Handle(context.Background())

	if err != nil {
		zap.S().Fatalw("failed to get composer", zap.Error(err))
	}

	//logger := log.Default()
	//logger.SetOutput(ioutil.Discard)

	handler, err := tusd.NewUnroutedHandler(tusd.Config{
		BasePath:                "/api/upload/",
		StoreComposer:           composer,
		RespectForwardedHeaders: true,
		MaxSize:                 52428800 * 2,
		//Logger:                  logger,
	})

	if err != nil {
		zap.S().Fatalw("failed to create handler", zap.Error(err))
	}

	rtr.POST("/api/upload/", gin.WrapH(http.StripPrefix("/api/upload/", handler.Middleware(http.HandlerFunc(handler.PostFile)))))
	rtr.HEAD("/api/upload/:id", gin.WrapH(http.StripPrefix("/api/upload/", handler.Middleware(http.HandlerFunc(handler.HeadFile)))))
	rtr.PATCH("/api/upload/:id", gin.WrapH(http.StripPrefix("/api/upload/", handler.Middleware(http.HandlerFunc(handler.PatchFile)))))
	rtr.DELETE("/api/upload/:id", gin.WrapH(http.StripPrefix("/api/upload/", handler.Middleware(http.HandlerFunc(func(writer http.ResponseWriter, request *http.Request) {
		writer.WriteHeader(http.StatusNoContent)
	})))))

	return rtr
}
