package ports

import (
	"context"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/gin-gonic/gin"
	log "github.com/jensneuse/abstractlogger"
	"github.com/jensneuse/graphql-go-tools/pkg/graphql"
	"go.uber.org/zap"
	"net/http"
	"overdoll/applications/puppy/internal/app"
	"overdoll/applications/puppy/internal/ports/gateway"
	"overdoll/libraries/helpers"
	"overdoll/libraries/router"
	"time"
)

func NewHttpServer(ctx context.Context, p app.Application) http.Handler {

	rtr := router.NewRawGinRouter()

	httpClient := p.GetHttpClient()
	graphqlEndpoint := "/api/graphql"

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

	var gqlHandlerFactory gateway.HandlerFactoryFn = func(schema *graphql.Schema, engine *graphql.ExecutionEngineV2) http.Handler {
		return gateway.NewGraphqlHTTPHandler(schema, engine, p, l)
	}

	gate := gateway.NewGateway(gqlHandlerFactory, httpClient, l)

	datasourceWatcher.Register(gate)
	go datasourceWatcher.Run(ctx)

	rtr.POST(graphqlEndpoint, gin.WrapH(gate))

	gate.Ready()

	return rtr
}
