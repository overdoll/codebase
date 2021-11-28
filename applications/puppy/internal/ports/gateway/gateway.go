package gateway

import (
	"context"
	log "github.com/jensneuse/abstractlogger"
	"github.com/jensneuse/graphql-go-tools/pkg/engine/plan"
	"github.com/vektah/gqlparser/v2"
	"github.com/vektah/gqlparser/v2/ast"
	"net/http"
	"sync"

	graphqlDataSource "github.com/jensneuse/graphql-go-tools/pkg/engine/datasource/graphql_datasource"
	"github.com/jensneuse/graphql-go-tools/pkg/graphql"
)

type DataSourceObserver interface {
	UpdateDataSources(dataSourceConfig []graphqlDataSource.Configuration)
}

type DataSourceSubject interface {
	Register(observer DataSourceObserver)
}

type HandlerFactory interface {
	Make(schema *graphql.Schema, engine *graphql.ExecutionEngineV2) http.Handler
}

type HandlerFactoryFn func(schema *graphql.Schema, engine *graphql.ExecutionEngineV2) http.Handler

func (h HandlerFactoryFn) Make(schema *graphql.Schema, engine *graphql.ExecutionEngineV2) http.Handler {
	return h(schema, engine)
}

func NewGateway(
	gqlHandlerFactory HandlerFactory,
	httpClient *http.Client,
	logger log.Logger,
) *Gateway {
	return &Gateway{
		gqlHandlerFactory: gqlHandlerFactory,
		httpClient:        httpClient,
		logger:            logger,

		mu:        &sync.Mutex{},
		readyCh:   make(chan struct{}),
		readyOnce: &sync.Once{},
	}
}

type Gateway struct {
	gqlHandlerFactory HandlerFactory
	httpClient        *http.Client
	logger            log.Logger

	gqlHandler http.Handler
	mu         *sync.Mutex

	readyCh   chan struct{}
	readyOnce *sync.Once
}

func (g *Gateway) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	g.mu.Lock()
	handler := g.gqlHandler
	g.mu.Unlock()

	handler.ServeHTTP(w, r)
}

func (g *Gateway) Ready() {
	<-g.readyCh
}

func (g *Gateway) UpdateDataSources(newDataSourcesConfig []graphqlDataSource.Configuration) {

	gatewaySDL := `
		type Query {
			node(id: ID!): Node
		}

		"""
		An object with an ID.
	  	Follows the [Relay Global Object Identification Specification](https://relay.dev/graphql/objectidentification.htm)
	  	"""
	  	interface Node {
			id: ID!
	  	}
	`

	// along with our data sources, we need to add another "service" which is the gateway that will accept
	// node types
	for _, config := range newDataSourcesConfig {
		// grab all new schemas, and add relay Node support to each of them
		schema, err := gqlparser.LoadSchema(&ast.Source{
			Name:    "node",
			Input:   config.UpstreamSchema,
			BuiltIn: false,
		})

		if err != nil {
			g.logger.Error("error loading schema:", log.Error(err))
			return
		}

		if schema.Query != nil {
			for _, q := range schema.Query.Fields {
				if q.Name == "node" {
					g.logger.Error(`service should not implement "node" Query type`, log.String("service", config.Federation.ServiceSDL))
				}
			}
		}

		for _, t := range schema.Types {
			for _, i := range t.Interfaces {
				if i == "Node" {
					gatewaySDL += `
				  		extend type ` + t.Name + ` implements Node @key(fields: "id") {
				  			id: ID! @external
						}
					`
				}
			}
		}
	}

	newDataSourcesConfig = append(newDataSourcesConfig, graphqlDataSource.Configuration{
		Fetch:        graphqlDataSource.FetchConfiguration{},
		Subscription: graphqlDataSource.SubscriptionConfiguration{},
		Federation: graphqlDataSource.FederationConfiguration{
			Enabled:    true,
			ServiceSDL: gatewaySDL,
		},
		UpstreamSchema: "",
	})

	ctx := context.Background()

	engineConfigFactory := graphql.NewFederationEngineConfigFactory(newDataSourcesConfig, graphqlDataSource.NewBatchFactory(), graphql.WithFederationHttpClient(g.httpClient))

	schema, err := engineConfigFactory.MergedSchema()
	if err != nil {
		g.logger.Error("get schema:", log.Error(err))
		return
	}

	datasourceConfig, err := engineConfigFactory.EngineV2Configuration()
	if err != nil {
		g.logger.Error("get engine config: %v", log.Error(err))
		return
	}

	datasourceConfig.EnableDataLoader(true)

	datasourceConfig.AddDataSource(plan.DataSourceConfiguration{
		RootNodes: []plan.TypeField{
			{TypeName: "Query", FieldNames: []string{"node"}},
		},
		Factory: &Factory{},
	})

	engine, err := graphql.NewExecutionEngineV2(ctx, g.logger, datasourceConfig)
	if err != nil {
		g.logger.Error("create engine: %v", log.Error(err))
		return
	}

	g.mu.Lock()
	g.gqlHandler = g.gqlHandlerFactory.Make(schema, engine)
	g.mu.Unlock()

	g.readyOnce.Do(func() { close(g.readyCh) })
}
