package service

import (
	"context"
	"log"

	"overdoll/applications/hades/src/adapters"
	"overdoll/applications/hades/src/app"
	"overdoll/applications/hades/src/app/command"
	"overdoll/applications/hades/src/app/query"
	"overdoll/libraries/bootstrap"
	"overdoll/libraries/common"
	"overdoll/libraries/rabbit"
	"overdoll/libraries/search"
)

func NewApplication(ctx context.Context) (app.Application, func()) {

	evaClient, cleanup := common.NewEvaClient(ctx)

	return createApplication(ctx, adapters.NewEvaGrpc(evaClient)),
		func() {
			cleanup()
		}
}

func NewComponentTestApplication(ctx context.Context) app.Application {
	return createApplication(ctx, EvaServiceMock{})
}

func createApplication(ctx context.Context, eva app.EvaService) app.Application {

	_, err := bootstrap.NewBootstrap(ctx)

	if err != nil {
		log.Fatalf("failed to bootstrap application: %s", err)
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

	srch := adapters.NewSearchElasticsearchRepository(es)

	return app.Application{
		Commands: app.Commands{
			GetUserSession: command.NewGetUserSessionHandler(eva),
		},
		Queries: app.Queries{
			SearchArtist:     query.NewSearchArtistsHandler(srch),
			SearchCategories: query.NewSearchCategoriesHandler(srch),
			SearchCharacters: query.NewSearchCharactersHandler(srch),
			SearchMedias:     query.NewSearchMediasHandler(srch),
		},
	}
}
