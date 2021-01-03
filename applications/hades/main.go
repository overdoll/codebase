package main

import (
	"context"
	"fmt"
	"github.com/99designs/gqlgen/graphql/handler/extension"
	"github.com/99designs/gqlgen/graphql/handler/lru"
	"github.com/99designs/gqlgen/graphql/handler/transport"
	"github.com/gin-gonic/gin"
	"github.com/gomodule/redigo/redis"
	"github.com/gorilla/websocket"
	"github.com/joho/godotenv"
	"log"
	"net/http"
	"os"
	"os/signal"
	gen "project01101000/codebase/applications/hades/src"
	"project01101000/codebase/applications/hades/src/directives"
	extension2 "project01101000/codebase/applications/hades/src/extensions"
	"project01101000/codebase/applications/hades/src/middleware"
	"project01101000/codebase/applications/hades/src/resolvers"
	"project01101000/codebase/applications/hades/src/services"
	"syscall"
	"time"

	"github.com/99designs/gqlgen/graphql/handler"
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

	evaSvc := os.Getenv("EVA_SERVICE")
	if evaSvc == "" {
		log.Fatalf("Failed to load environment variable: %s", "EVA_SERVICE")
	}

	// Connect to the services
	svcs, err := services.NewServicesKeeper(services.ServicesConfig{
		EvaSvc: evaSvc,
	})

	if err != nil {
		log.Fatalf("Failed to create grpc api holder: %s", err)
	}

	redisSvc, err := redis.Dial("tcp", os.Getenv("REDIS_URL")+":6379", redis.DialDatabase(1))

	if err != nil {
		log.Fatalf("Failed to connect to redis: %s", err)
	}

	redisSvc2, err := redis.Dial("tcp", os.Getenv("REDIS_URL")+":6379", redis.DialDatabase(1))

	if err != nil {
		log.Fatalf("Failed to connect to redis: %s", err)
	}

	redisPubSub := redis.PubSubConn{Conn: redisSvc2}

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

	cache, err := NewCache()

	// Create graphApi handlers - GET and POST
	gqlHandler := HandleGraphQL(svcs, redisSvc, redisPubSub, cache)

	router.POST("/graphql", gqlHandler)
	router.GET("/graphql", gqlHandler)

	srv := &http.Server{
		Addr:         fmt.Sprintf(":%s", port),
		WriteTimeout: time.Second * 10,
		ReadTimeout:  time.Second * 10,
		Handler:      router,
	}

	// Start graph_api server
	log.Printf("Server started on http://localhost:%s/", port)
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
func HandleGraphQL(services services.Services, redisSvc redis.Conn, redisPubSub redis.PubSubConn, cache *Cache) gin.HandlerFunc {

	return func(c *gin.Context) {
		graphAPIHandler := handler.New(gen.NewExecutableSchema(gen.Config{
			Resolvers:  resolvers.NewResolver(services, redisSvc, redisPubSub),
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
		graphAPIHandler.AddTransport(transport.MultipartForm{})
		graphAPIHandler.SetQueryCache(lru.New(1000))

		// Add APQ
		graphAPIHandler.Use(extension2.AutomaticPersistedQuery{Cache: cache})

		// Query complexity limit
		//graphAPIHandler.Use(extension.FixedComplexityLimit(3))

		graphAPIHandler.ServeHTTP(c.Writer, c.Request)
	}

}
