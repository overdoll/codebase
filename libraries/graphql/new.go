package graphql

import (
	"os"
	"time"

	"github.com/99designs/gqlgen/graphql"
	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/handler/extension"
	"github.com/99designs/gqlgen/graphql/handler/lru"
	"github.com/99designs/gqlgen/graphql/handler/transport"
	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
)

func HandleGraphQL(schema graphql.ExecutableSchema) gin.HandlerFunc {
	return func(c *gin.Context) {
		graphAPIHandler := handler.New(schema)

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

		graphAPIHandler.Use(PassportInjector{})

		graphAPIHandler.AddTransport(transport.POST{})
		graphAPIHandler.AddTransport(transport.GET{})

		var mb int64 = 1 << 20
		graphAPIHandler.AddTransport(transport.MultipartForm{
			MaxMemory:     32 * mb,
			MaxUploadSize: 50 * mb,
		})

		graphAPIHandler.SetQueryCache(lru.New(1000))

		// Query complexity limit
		graphAPIHandler.ServeHTTP(c.Writer, c.Request)
	}
}
