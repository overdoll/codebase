package graphql

import (
	"context"
	"errors"
	"fmt"
	"github.com/gorilla/websocket"
	"net/http"
	"overdoll/libraries/helpers"
	"overdoll/libraries/passport"
	"time"

	"github.com/99designs/gqlgen/graphql"
	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/handler/apollotracing"
	"github.com/99designs/gqlgen/graphql/handler/extension"
	"github.com/99designs/gqlgen/graphql/handler/lru"
	"github.com/99designs/gqlgen/graphql/handler/transport"
	"github.com/gin-gonic/gin"
	"github.com/vektah/gqlparser/v2/gqlerror"
	"go.uber.org/zap"
)

type TestPassportResponse struct{}

func (r TestPassportResponse) ExtensionName() string {
	return "2InlineResponseFunc"
}

func (r TestPassportResponse) Validate(schema graphql.ExecutableSchema) error {
	return nil
}

func (r TestPassportResponse) InterceptResponse(ctx context.Context, next graphql.ResponseHandler) *graphql.Response {

	pass := passport.FromContext(ctx)

	fmt.Println(pass.Authenticated())

	resp := next(ctx)

	return resp
}

func HandleGraphQL(schema graphql.ExecutableSchema) gin.HandlerFunc {
	return func(c *gin.Context) {
		graphAPIHandler := handler.New(schema)

		// set default error presenter to show 'internal server error'
		graphAPIHandler.SetErrorPresenter(func(ctx context.Context, e error) *gqlerror.Error {
			// notify bug tracker?

			err := graphql.DefaultErrorPresenter(ctx, e)

			zap.S().Error("resolver failed ", err)

			if !helpers.IsDebug() {
				err.Message = "internal server error"
			}

			return err
		})

		graphAPIHandler.SetRecoverFunc(func(ctx context.Context, err interface{}) error {
			// notify bug tracker?
			zap.S().Error("resolver failed ", err)

			return errors.New("internal server error")
		})

		graphAPIHandler.Use(TestPassportResponse{})

		graphAPIHandler.Use(apollotracing.Tracer{})

		if helpers.IsDebug() {
			graphAPIHandler.Use(extension.Introspection{})
		}

		graphAPIHandler.AddTransport(transport.Websocket{
			KeepAlivePingInterval: 10 * time.Second,
			Upgrader: websocket.Upgrader{
				CheckOrigin: func(r *http.Request) bool {
					return true
				},
			},
		})

		graphAPIHandler.AddTransport(transport.POST{})

		graphAPIHandler.SetQueryCache(lru.New(1000))

		// Query complexity limit
		graphAPIHandler.ServeHTTP(c.Writer, c.Request)
	}
}
