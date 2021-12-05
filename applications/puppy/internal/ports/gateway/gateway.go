package gateway

import (
	"context"
	"github.com/gorilla/sessions"
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
	store             sessions.Store

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

	federationSDL := `
		scalar _Any
		scalar _FieldSet
		
		# a union of all types that use the @key directive
		union _Entity
		
		type _Service {
		  sdl: String
		}
		
		extend type Query {
		  _entities(representations: [_Any!]!): [_Entity]!
		  _service: _Service!
		}
		
		directive @external on FIELD_DEFINITION
		directive @requires(fields: _FieldSet!) on FIELD_DEFINITION
		directive @provides(fields: _FieldSet!) on FIELD_DEFINITION
		directive @key(fields: _FieldSet!) repeatable on OBJECT | INTERFACE
		
		# this is an optional directive discussed below
		directive @extends on OBJECT | INTERFACE
	`

	gatewaySDL := `
		"""
		An object with an ID.
	Follows the [Relay Global Object Identification Specification](https://relay.dev/graphql/objectidentification.htm)
	  	"""
	  	interface Node {
			id: ID!
	  	}

		extend type Query {
		"""
		Represents a Relay Node [Relay Global Object Identification Specification](https://relay.dev/graphql/objectidentification.htm)
	  	"""
			node(id: ID!): Node
		}
	`

	// along with our data sources, we need to add another "service" which is the gateway that will accept
	// node types
	for _, config := range newDataSourcesConfig {
		// grab all new schemas, and add relay Node support to each of them
		schema, err := gqlparser.LoadSchema(&ast.Source{
			Name:    "node",
			Input:   federationSDL + config.Federation.ServiceSDL,
			BuiltIn: true,
		})

		if err != nil {
			g.logger.Error("error loading schema:", log.Error(err))
			return
		}

		if schema.Query != nil {
			for _, q := range schema.Query.Fields {
				if q.Name == "node" {
					g.logger.Error(`service should not implement "node" Query type`, log.String("service", config.Federation.ServiceSDL))
					return
				}
			}
		}

		for _, t := range schema.Types {
			for _, i := range t.Interfaces {
				if i == "Node" {
					gatewaySDL += `
				  		extend type ` + t.Name + ` @key(fields: "id") {
				  			id: ID! @external
						}
					`
				}
			}
		}
	}

	// set data source config - will delete it later with our new modifications
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

	batchFactory := graphqlDataSource.NewBatchFactory()

	engineConfigFactory := graphql.NewFederationEngineConfigFactory(newDataSourcesConfig, batchFactory, graphql.WithFederationHttpClient(g.httpClient))

	datasourceConfig, err := engineConfigFactory.EngineV2Configuration()
	if err != nil {
		g.logger.Error("get engine config: %v", log.Error(err))
		return
	}

	schema, err := engineConfigFactory.MergedSchema()

	if err != nil {
		g.logger.Error("new schema error: %v", log.Error(err))
		return
	}

	var datasources []plan.DataSourceConfiguration

	for _, datasource := range datasourceConfig.DataSources() {
		for _, name := range datasource.RootNodes {
			if name.TypeName == "Query" {
				for _, fieldName := range name.FieldNames {
					if fieldName == "node" {
						// found node - edit datasource to be custom for this
						datasource.Factory = &graphqlDataSource.Factory{
							HTTPClient: &http.Client{
								// use a local transport that will not actually ever send an http call, but will actually just resolve local nodes
								Transport: &gatewayLocalTransport{},
							},
							BatchFactory: batchFactory,
						}
						break
					}
				}
			}
		}
		datasources = append(datasources, datasource)
	}

	// update data sources with new factory
	datasourceConfig.SetDataSources(datasources)
	datasourceConfig.EnableDataLoader(true)
	// CUSTOM NODE DATA SOURCE END

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
