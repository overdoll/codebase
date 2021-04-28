package ports

import (
	"context"
	"fmt"
	"net/http"
	"os"
	"time"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/handler/extension"
	"github.com/99designs/gqlgen/graphql/handler/lru"
	"github.com/99designs/gqlgen/graphql/handler/transport"
	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
	"overdoll/applications/hades/src/app"
	gen "overdoll/applications/hades/src/ports/graphql"
	"overdoll/libraries/extensions"
	"overdoll/libraries/middleware"
)

type GraphQLServer struct {
	app app.Application
}

func NewGraphQLServer(app app.Application) *http.Server {
	router := gin.Default()

	if os.Getenv("APP_DEBUG") == "true" {
		gin.SetMode(gin.DebugMode)
	} else {
		gin.SetMode(gin.ReleaseMode)
	}

	// Add gin context to context
	router.Use(middleware.GinContextToContextMiddleware())

	// Add user to context, if session cookie exists
	router.Use(func(c *gin.Context) {

		ck, err := c.Request.Cookie("session")

		if err != nil {
			c.Next()
			return
		}

		usr, err := app.Commands.GetUserSession.Handle(c.Request.Context(), ck.Value)

		if err != nil {
			c.Next()
			return
		}

		// put it in context
		ctx := context.WithValue(c.Request.Context(), "UserContextKey", usr)

		// and call the next with our new context
		c.Request = c.Request.WithContext(ctx)
		c.Next()
		return
	})

	// APQ cache
	cache, err := extensions.NewCache()

	if err != nil {
		panic(err)
	}

	// Create resolver, with services
	gqlResolver := gen.NewResolver(app)

	// Create graphApi handlers - GET and POST
	gqlHandler := HandleGraphQL(gqlResolver, cache)

	// We only do CSRF middleware on here, because it doesn't work on WS
	router.POST("/graphql", middleware.CSRFCheck(), gqlHandler)
	router.GET("/graphql", gqlHandler)

	return &http.Server{
		Addr:         fmt.Sprint(":8080"),
		WriteTimeout: time.Second * 10,
		ReadTimeout:  time.Second * 10,
		Handler:      router,
	}
}

// HandleGraphQL - handle graphQL
func HandleGraphQL(resolver gen.ResolverRoot, cache *extensions.Cache) gin.HandlerFunc {

	return func(c *gin.Context) {
		graphAPIHandler := handler.New(gen.NewExecutableSchema(gen.Config{
			Resolvers:  resolver,
			Directives: gen.Directive(),
		}))

		graphAPIHandler.AddTransport(&transport.Websocket{
			KeepAlivePingInterval: 10 * time.Second,
			Upgrader: websocket.Upgrader{
				ReadBufferSize:  1024,
				WriteBufferSize: 1024,
			},
		})

		if os.Getenv("APP_DEBUG") == "true" {
			graphAPIHandler.Use(extension.Introspection{})
		} else {
			graphAPIHandler.Use(extension.FixedComplexityLimit(3))
		}

		graphAPIHandler.AddTransport(transport.POST{})
		graphAPIHandler.AddTransport(transport.GET{})

		var mb int64 = 1 << 20
		graphAPIHandler.AddTransport(transport.MultipartForm{
			MaxMemory:     32 * mb,
			MaxUploadSize: 50 * mb,
		})

		graphAPIHandler.SetQueryCache(lru.New(1000))

		// Add APQ
		graphAPIHandler.Use(extensions.AutomaticPersistedQuery{Cache: cache})

		// Query complexity limit
		graphAPIHandler.ServeHTTP(c.Writer, c.Request)
	}
}
