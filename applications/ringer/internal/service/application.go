package service

import (
	"context"
	"go.temporal.io/sdk/client"
	"go.temporal.io/sdk/mocks"
	"overdoll/applications/ringer/internal/adapters"
	"overdoll/applications/ringer/internal/app"
	"overdoll/applications/ringer/internal/app/workflows/activities"

	"overdoll/libraries/bootstrap"
	"overdoll/libraries/clients"
)

func NewApplication(ctx context.Context) (app.Application, func()) {

	// bootstrap application
	bootstrap.NewBootstrap(ctx)

	return createApplication(ctx,
			clients.NewTemporalClient(ctx),
		),
		func() {
		}
}

func NewComponentTestApplication(ctx context.Context) (app.Application, func(), *mocks.Client) {

	temporalClient := &mocks.Client{}

	return createApplication(ctx,
			temporalClient,
		),
		func() {
		},
		temporalClient
}

func createApplication(ctx context.Context, client client.Client) app.Application {

	session := bootstrap.InitializeDatabaseSession()
	esClient := bootstrap.InitializeElasticSearchSession()
	awsSession := bootstrap.InitializeAWSSession()

	eventRepo := adapters.NewEventTemporalRepository(client)

	paymentRepo := adapters.NewPaymentCassandraRepository(session)
	paymentIndexRepo := adapters.NewPaymentIndexElasticSearchRepository(esClient, session)
	payoutRepo := adapters.NewPayoutCassandraRepository(session)
	payoutIndexRepo := adapters.NewPayoutIndexElasticSearchRepository(esClient, session)
	balanceRepo := adapters.NewBalanceCassandraRepository(session)

	return app.Application{
		Commands:   app.Commands{},
		Queries:    app.Queries{},
		Activities: activities.NewActivitiesHandler(paymentRepo, paymentIndexRepo, payoutRepo, payoutIndexRepo, balanceRepo),
	}
}
