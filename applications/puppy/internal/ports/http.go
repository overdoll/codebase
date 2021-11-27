package ports

import (
	"context"
	"github.com/gin-gonic/gin"
	log "github.com/jensneuse/abstractlogger"
	"github.com/jensneuse/graphql-go-tools/pkg/graphql"
	"github.com/jensneuse/graphql-go-tools/pkg/playground"
	"go.uber.org/zap"
	"net/http"
	"overdoll/applications/puppy/internal/app"
	"overdoll/applications/puppy/internal/ports/gateway"
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

	p := playground.New(playground.Config{
		GraphqlEndpointPath:             graphqlEndpoint,
		GraphQLSubscriptionEndpointPath: graphqlEndpoint,
	})

	handlers, err := p.Handlers()

	if err != nil {
		zap.S().Fatal("failed to get handlers", zap.Error(err))
	}

	for i := range handlers {
		rtr.Any(handlers[i].Path, gin.WrapH(handlers[i].Handler))
	}

	l := log.NewZapLogger(zap.L(), log.DebugLevel)

	var gqlHandlerFactory gateway.HandlerFactoryFn = func(schema *graphql.Schema, engine *graphql.ExecutionEngineV2) http.Handler {
		return gateway.NewGraphqlHTTPHandler(schema, engine, l)
	}

	gate := gateway.NewGateway(gqlHandlerFactory, httpClient, l)

	datasourceWatcher.Register(gate)
	go datasourceWatcher.Run(ctx)

	// graphql
	rtr.POST(graphqlEndpoint, gin.WrapH(gate))

	gate.Ready()

	return rtr
}
