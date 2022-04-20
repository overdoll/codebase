package service

import (
	"context"
	"go.temporal.io/sdk/client"
	"net/http"
	"overdoll/applications/ringer/internal/adapters"
	"overdoll/applications/ringer/internal/app"
	"overdoll/applications/ringer/internal/app/query"
	"overdoll/applications/ringer/internal/app/workflows/activities"

	"overdoll/libraries/bootstrap"
	"overdoll/libraries/clients"
)

func NewApplication(ctx context.Context) (app.Application, func()) {

	// bootstrap application
	bootstrap.NewBootstrap(ctx)

	ccbillClient := &http.Client{}

	return createApplication(ctx,
			clients.NewTemporalClient(ctx),
			ccbillClient,
		),
		func() {
		}
}

func createApplication(ctx context.Context, client client.Client, paxumClient adapters.PaxumHttpClient) app.Application {

	session := bootstrap.InitializeDatabaseSession()
	esClient := bootstrap.InitializeElasticSearchSession()
	awsSession := bootstrap.InitializeAWSSession()

	eventRepo := adapters.NewEventTemporalRepository(client)

	paymentRepo := adapters.NewPaymentCassandraRepository(session)
	paymentIndexRepo := adapters.NewPaymentIndexElasticSearchRepository(esClient, session)
	payoutRepo := adapters.NewPayoutCassandraRepository(session)
	payoutIndexRepo := adapters.NewPayoutIndexElasticSearchRepository(esClient, session)
	balanceRepo := adapters.NewBalanceCassandraRepository(session)
	detailsRepo := adapters.NewDetailsCassandraRepository(session)
	paxumRepo := adapters.NewPaxumHttpCassandraRepository(paxumClient)

	return app.Application{
		Commands: app.Commands{},
		Queries: app.Queries{
			PrincipalById: query.NewPrincipalByIdHandler(eva, eventRepo),
		},
		Activities: activities.NewActivitiesHandler(paymentRepo, paymentIndexRepo, payoutRepo, payoutIndexRepo, balanceRepo, detailsRepo, paxumRepo),
	}
}
