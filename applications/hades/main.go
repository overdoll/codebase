package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/99designs/gqlgen/graphql/handler/extension"
	"github.com/99designs/gqlgen/graphql/handler/lru"
	"github.com/99designs/gqlgen/graphql/handler/transport"
	"github.com/gin-gonic/gin"
	"github.com/gomodule/redigo/redis"
	"github.com/gorilla/websocket"
	"github.com/joho/godotenv"
	gen "overdoll/applications/hades/src/graphql"
	"overdoll/applications/hades/src/graphql/directives"
	extension2 "overdoll/applications/hades/src/graphql/extensions"
	"overdoll/applications/hades/src/graphql/resolver"
	"overdoll/applications/hades/src/middleware"
	"overdoll/applications/hades/src/services"

	"github.com/99designs/gqlgen/graphql/handler"
	"overdoll/libraries/rabbit"
)

func init() {
	err := godotenv.Load(DIRECTORY + ".env")

	if err != nil {
		log.Fatal("Error loading .env file")
	}
}

func main() {
	// Load environment variables
	port := os.Getenv("GRAPH_API_PORT")
	if port == "" {
		port = defaultPort
	}

	// Connect to the services
	svcs, err := services.NewServicesKeeper(context.Background())
	if err != nil {
		log.Fatalf("Failed to create grpc api holder: %s", err)
	}

	// Redis
	redisSvc, err := redis.Dial("tcp", os.Getenv("REDIS_URL"), redis.DialDatabase(1))
	if err != nil {
		log.Fatalf("Failed to connect to redis: %s", err)
	}

	// RabbitMQ
	rabbitSvc, err := rabbit.GetConn(os.Getenv("RABBITMQ_URL"))
	if err != nil {
		panic(err)
	}

	router := gin.Default()

	if os.Getenv("APP_DEBUG") == "true" {
		gin.SetMode(gin.DebugMode)
	} else {
		gin.SetMode(gin.ReleaseMode)
	}

	// Add gin context to context
	router.Use(middleware.GinContextToContextMiddleware())

	// Add user to context, if session cookie exists
	router.Use(middleware.AuthenticationMiddleware(svcs, redisSvc))

	// APQ cache
	cache, err := NewCache()

	// Create resolver, with services
	gqlResolver := resolver.NewResolver(svcs, redisSvc, rabbitSvc)

	// Create graphApi handlers - GET and POST
	gqlHandler := HandleGraphQL(gqlResolver, cache)

	// We only do CSRF middleware on here, because it doesn't work on WS
	router.POST("/graphql", middleware.CSRFCheck(), gqlHandler)
	router.GET("/graphql", gqlHandler)

	srv := &http.Server{
		Addr:         fmt.Sprintf(":%s", port),
		WriteTimeout: time.Second * 10,
		ReadTimeout:  time.Second * 10,
		Handler:      router,
	}

	// Start graph_api server
	log.Printf("server started on port %s", port)
	go func() {
		log.Fatal(srv.ListenAndServe())
	}()

	sig := make(chan os.Signal, 1)
	signal.Notify(sig, os.Interrupt, syscall.SIGTERM)

	// Block until cancel signal is received.
	<-sig
	ctx, cancel := context.WithTimeout(context.Background(), 1*time.Second)
	defer cancel()
	log.Print("Shutting down hades")

	if err := srv.Shutdown(ctx); err != nil {
		log.Print(err)
	}
	<-ctx.Done()
	os.Exit(0)
}

// HandleGraphQL - handle graphQL
func HandleGraphQL(resolver gen.ResolverRoot, cache *Cache) gin.HandlerFunc {

	return func(c *gin.Context) {
		graphAPIHandler := handler.New(gen.NewExecutableSchema(gen.Config{
			Resolvers:  resolver,
			Directives: directives.NewDirectives(),
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
		graphAPIHandler.Use(extension2.AutomaticPersistedQuery{Cache: cache})

		// Query complexity limit
		//graphAPIHandler.Use(extension.FixedComplexityLimit(3))

		graphAPIHandler.ServeHTTP(c.Writer, c.Request)
	}

}
