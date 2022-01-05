package ports

import (
	"context"
	"net/http"
	"overdoll/applications/loader/internal/app"

	"github.com/gin-gonic/gin"
	tusd "github.com/tus/tusd/pkg/handler"
	"go.temporal.io/sdk/client"
	"go.uber.org/zap"
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

func NewHttpServer(app *app.Application, client client.Client) http.Handler {

	rtr := router.NewGinRouter()

	rtr.Use(principal.GinPrincipalRequestMiddleware(GraphQLServer{app: app}))

	// graphql
	rtr.POST("/api/graphql",
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
