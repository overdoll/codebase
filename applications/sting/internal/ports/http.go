package ports

import (
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

func NewGraphQLServer(app *app.Application, client client.Client) http.Handler {
	rtr := router.NewGinRouter()

	rtr.POST("/graphql", principalToContext(app), graphql.HandleGraphQL(gen.NewExecutableSchema(gen.Config{
		Resolvers: gen.NewResolver(app, client),
	})))

	return rtr
}

func HandleTus(app *app.Application) http.Handler {

	rtr := router.NewGinRouter()

	handler, err := tusd.NewUnroutedHandler(config)

	rtr.POST("", gin.HandlerFunc(handler.PostFile))
	rtr.HEAD(":id", gin.HandlerFunc(handler.HeadFile))
	rtr.PATCH(":id", gin.HandlerFunc(handler.PatchFile))
	rtr.GET(":id", gin.HandlerFunc(handler.GetFile))

	return rtr
}

func NewHttpServer(app app.Application) *http.ServeMux {
	httpServer := &HttpServer{app: app}

	mx := http.NewServeMux()
	// Set up routes
	mx.Handle("/api/upload/"))

	return mx
}

func (h *HttpServer) HandleTUS() *tusd.Handler {

	handler, err := h.app.Commands.HandleUpload.Handle(context.Background())

	if err != nil {
		log.Fatal(err)
	}

	return handler
}
