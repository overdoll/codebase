package service

import (
	"context"
	"net/http"
	"os"
	"overdoll/applications/hades/internal/adapters"
	"overdoll/applications/hades/internal/app"
	"overdoll/applications/hades/internal/app/command"
	"overdoll/applications/hades/internal/app/query"
	"overdoll/applications/hades/internal/app/workflows/activities"

	"overdoll/libraries/bootstrap"
	"overdoll/libraries/clients"
)

func NewApplication(ctx context.Context) (app.Application, func()) {

	// bootstrap application
	bootstrap.NewBootstrap(ctx)

	evaClient, cleanup := clients.NewEvaClient(ctx, os.Getenv("EVA_SERVICE"))
	stellaClient, cleanup2 := clients.NewStellaClient(ctx, os.Getenv("STELLA_SERVICE"))

	return createApplication(ctx,
			adapters.NewEvaGrpc(evaClient),
			adapters.NewStellaGrpc(stellaClient),
		),
		func() {
			cleanup()
			cleanup2()
		}
}

func NewComponentTestApplication(ctx context.Context) (app.Application, func()) {

	bootstrap.NewBootstrap(ctx)

	evaClient, cleanup := clients.NewEvaClient(ctx, os.Getenv("EVA_SERVICE"))

	return createApplication(ctx,
			// kind of "mock" eva, it will read off a stored database of accounts for testing first before reaching out to eva.
			// this makes testing easier because we can get reproducible tests with each run
			EvaServiceMock{adapter: adapters.NewEvaGrpc(evaClient)},
			StellaServiceMock{},
		),
		func() {
			cleanup()
		}
}

func createApplication(ctx context.Context, eva query.EvaService, stella command.StellaService) app.Application {

	session := bootstrap.InitializeDatabaseSession()

	client := clients.NewTemporalClient(ctx)

	awsSession := bootstrap.InitializeAWSSession()

	ccbillClient := &http.Client{}

	eventRepo := adapters.NewEventTemporalRepository(client)
	billingRepo := adapters.NewBillingCassandraRepository(session)
	pricingRepo := adapters.NewBillingPricingRepository(session)
	billingFileRepo := adapters.NewBillingCassandraS3TemporalFileRepository(session, awsSession, client)
	ccbillRepo := adapters.NewCCBillHttpRepository(ccbillClient)

	return app.Application{
		Commands: app.Commands{
			GenerateCCBillClubSupporterPaymentLink: command.NewGenerateCCBillClubSupportPaymentLinkHandler(billingRepo, pricingRepo, stella, eva),
			ProcessCCBillWebhook:                   command.NewProcessCCBillWebhookHandler(eventRepo),
		},
		Queries: app.Queries{
			PrincipalById: query.NewPrincipalByIdHandler(eva),
		},
		Activities: activities.NewActivitiesHandler(billingRepo, billingFileRepo, ccbillRepo, stella),
	}
}
