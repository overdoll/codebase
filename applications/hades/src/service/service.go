package service

import (
	"context"
	"os"

	"github.com/gomodule/redigo/redis"
	"google.golang.org/grpc"
	"overdoll/applications/hades/src/app"
	"overdoll/applications/hades/src/services"
	"overdoll/libraries/bootstrap"
	"overdoll/libraries/common"
	"overdoll/libraries/rabbit"
	"overdoll/libraries/search"
)

func NewApplication(ctx context.Context) (app.Application, func()) {

	evaGrpc, cleanup := common.NewEvaConnection(ctx)

	return createApplication(ctx, evaGrpc),
		func() {
			cleanup()
		}
}

func NewComponentTestApplication(ctx context.Context) app.Application {
	return createApplication(ctx, common.EvaServiceMock{})
}

func createApplication(ctx context.Context, eva common.EvaService) app.Application {

	ctx := context.Background()

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

	return app.Application{
		Commands: app.Commands{
		},
		Queries: app.Queries{
		},
	}
}
