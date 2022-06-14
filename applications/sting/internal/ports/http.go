package ports

import (
	"context"
	"github.com/gin-gonic/gin"
	tusd "github.com/tus/tusd/pkg/handler"
	"go.uber.org/zap"
	"io/ioutil"
	"log"
	"net/http"
	"overdoll/applications/sting/internal/app"
	gen "overdoll/applications/sting/internal/ports/graphql"
	"overdoll/applications/sting/internal/ports/graphql/dataloader"
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

func NewHttpServer(app *app.Application) http.Handler {

	rtr := router.NewGinRouter(GraphQLServer{app: app})

	rtr.Use(dataLoaderToContext(app))

	composer, err := app.Commands.TusComposer.Handle(context.Background())

	if err != nil {
		zap.S().Fatalw("failed to get composer", zap.Error(err))
	}

	logger := log.Default()
	logger.SetOutput(ioutil.Discard)

	handler, err := tusd.NewUnroutedHandler(tusd.Config{
		BasePath:                "/api/upload/",
		StoreComposer:           composer,
		RespectForwardedHeaders: true,
		Logger:                  logger,
	})

	if err != nil {
		zap.S().Fatalw("failed to create handler", zap.Error(err))
	}

	rtr.POST("/api/upload/", gin.WrapH(http.StripPrefix("/api/upload/", handler.Middleware(http.HandlerFunc(handler.PostFile)))))
	rtr.HEAD("/api/upload/:id", gin.WrapH(http.StripPrefix("/api/upload/", handler.Middleware(http.HandlerFunc(handler.HeadFile)))))
	rtr.PATCH("/api/upload/:id", gin.WrapH(http.StripPrefix("/api/upload/", handler.Middleware(http.HandlerFunc(handler.PatchFile)))))

	// graphql
	rtr.POST("/api/graphql",
		graphql.HandleGraphQL(gen.NewExecutableSchema(gen.Config{
			Resolvers: gen.NewResolver(app),
		})),
	)

	return rtr
}
