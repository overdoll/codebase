package ports

import (
	"context"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/gin-gonic/gin"
	"github.com/gorilla/sessions"
	log "github.com/jensneuse/abstractlogger"
	"github.com/jensneuse/graphql-go-tools/pkg/graphql"
	"go.uber.org/zap"
	"net/http"
	"os"
	"overdoll/applications/puppy/internal/app"
	"overdoll/applications/puppy/internal/ports/gateway"
	"overdoll/libraries/helpers"
	"overdoll/libraries/router"
	"time"
)

func NewHttpServer(ctx context.Context, app *app.Application) http.Handler {
	rtr := router.NewGinRouter()

	graphqlEndpoint := "/api/graphql"

	httpClient := http.DefaultClient

	datasourceWatcher := gateway.NewDatasourcePoller(httpClient, gateway.DatasourcePollerConfig{
		Services: []gateway.ServiceConfig{
			{Name: "eva", URL: "http://eva:8000/api/graphql", WS: "ws://eva:8000/api/graphql"},
			{Name: "sting", URL: "http://sting:8000/api/graphql", WS: "ws://sting:8000/api/graphql"},
			{Name: "parley", URL: "http://parley:8000/api/graphql", WS: "ws://parley:8000/api/graphql"},
		},
		PollingInterval: 30 * time.Second,
	})

	// graphql playground enabled on debug only
	if helpers.IsDebug() {
		rtr.GET("/api/graphql", gin.WrapH(playground.Handler("GraphQL playground", "/api/graphql")))
	}

	l := log.NewZapLogger(zap.L(), log.DebugLevel)

	var store sessions.Store = sessions.NewCookieStore([]byte(os.Getenv("COOKIE_KEY")), []byte(os.Getenv("COOKIE_BLOCK_KEY")))

	var gqlHandlerFactory gateway.HandlerFactoryFn = func(schema *graphql.Schema, engine *graphql.ExecutionEngineV2) http.Handler {
		return gateway.NewGraphqlHTTPHandler(schema, engine, l, store)
	}

	gate := gateway.NewGateway(gqlHandlerFactory, httpClient, l)

	datasourceWatcher.Register(gate)
	go datasourceWatcher.Run(ctx)

	rtr.POST(graphqlEndpoint, gin.WrapH(gate))

	gate.Ready()

	return rtr
}
