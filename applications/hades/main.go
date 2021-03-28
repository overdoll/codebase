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
	gen "overdoll/applications/hades/src/graphql"
	extension2 "overdoll/applications/hades/src/graphql/extensions"
	"overdoll/applications/hades/src/middleware"
	"overdoll/applications/hades/src/services"
	"overdoll/libraries/bootstrap"
	"overdoll/libraries/search"

	"github.com/99designs/gqlgen/graphql/handler"
	"overdoll/libraries/rabbit"
)

func main() {

	ctx := context.Background()

	_, err := bootstrap.NewBootstrap(ctx)

	if err != nil {
		log.Fatalf("failed to bootstrap application: %s", err)
	}

	// Connect to the services
	svc, err := services.Dial(context.Background())
	if err != nil {
		log.Fatalf("failed to connect to services: %s", err)
	}

	// Redis
	redisSvc, err := redis.Dial("tcp", os.Getenv("REDIS_URL"), redis.DialDatabase(1))

	if err != nil {
		log.Fatalf("failed to connect to redis: %s", err)
	}

	// RabbitMQ
	rabbitSvc, err := rabbit.GetConn()

	if err != nil {
		log.Fatalf("failed to connect to rabbitmq: %s", err)
	}

	// ElasticSearch
	es, err := search.NewStore(ctx)

	if err != nil {
		log.Fatalf("failed to connect to elasticsearch: %s", err)
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
	router.Use(middleware.AuthenticationMiddleware(svc, redisSvc))

	// APQ cache
	cache, err := extension2.NewCache()

	// Create resolver, with services
	gqlResolver := gen.NewResolver(svc, redisSvc, rabbitSvc, es)

	// Create graphApi handlers - GET and POST
	gqlHandler := HandleGraphQL(gqlResolver, cache)

	// We only do CSRF middleware on here, because it doesn't work on WS
	router.POST("/graphql", middleware.CSRFCheck(), gqlHandler)
	router.GET("/graphql", gqlHandler)

	srv := &http.Server{
		Addr:         fmt.Sprint(":8080"),
		WriteTimeout: time.Second * 10,
		ReadTimeout:  time.Second * 10,
		Handler:      router,
	}

	// Start graph_api server
	log.Printf("server started on port 8080")
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
func HandleGraphQL(resolver gen.ResolverRoot, cache *extension2.Cache) gin.HandlerFunc {

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

		if os.Getenv("ENABLE_INTROSPECTION") == "true" {
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
