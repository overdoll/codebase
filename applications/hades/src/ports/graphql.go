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
	eva "overdoll/applications/eva/proto"
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

		usr, err := app.Commands.GetUserSession(c.Request.Context(), )


		// If it doesn't exist in Redis, we remove it
		if err != nil || existing == 0 {
			// Instead of a 403 abort, we just remove this invalid session cookie
			//c.AbortWithStatus(http.StatusForbidden)
			http.SetCookie(c.Writer, &http.Cookie{Name: "session", Value: "", MaxAge: -1, HttpOnly: true, Secure: true, Path: "/"})
			c.Next()
			return
		}

		// Verify user exists with this token by grabbing the user
		user, err := services.Eva().GetUser(c, &eva.GetUserRequest{Id: claims.Id})

		if err != nil {
			// No user - we just remove this token from our set
			// c.AbortWithStatus(http.StatusForbidden)
			http.SetCookie(c.Writer, &http.Cookie{Name: "session", Value: "", MaxAge: -1, HttpOnly: true, Secure: true, Path: "/"})
			redis.Do("SREM", "session:"+claims.Id, cookie.Value)
			c.Next()
			return
		}

		_, err = helpers.CreateUserSession(c, redis, claims.Id)

		if err != nil {
			c.AbortWithStatus(http.StatusInternalServerError)
			return
		}

		// remove old token since its not valid anymore (we "expired" it)
		existing, err = redis.Do("SREM", "session:"+claims.Id, cookie.Value)

		// Redis error
		if err != nil {
			c.AbortWithStatus(http.StatusInternalServerError)
			return
		}

		// put it in context
		ctx := context.WithValue(c.Request.Context(), "UserContextKey",
			&domain.AuthenticatedUser{
				Id:       user.Id,
				Username: user.Username,
				Token:    jwtToken.Raw,
				Roles:    user.Roles,
				Verified: user.Verified,
			},
		)

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
