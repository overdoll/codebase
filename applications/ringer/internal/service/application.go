package service

import (
	"context"
	"go.temporal.io/sdk/client"
	"go.temporal.io/sdk/mocks"
	"net/http"
	"os"
	"overdoll/applications/ringer/internal/adapters"
	"overdoll/applications/ringer/internal/app"
	"overdoll/applications/ringer/internal/app/command"
	"overdoll/applications/ringer/internal/app/query"
	"overdoll/applications/ringer/internal/app/workflows/activities"

	"overdoll/libraries/bootstrap"
	"overdoll/libraries/clients"
)

func NewApplication(ctx context.Context) (app.Application, func()) {

	// bootstrap application
	bootstrap.NewBootstrap(ctx)
	evaClient, cleanup := clients.NewEvaClient(ctx, os.Getenv("EVA_SERVICE"))
	stellaClient, cleanup2 := clients.NewStellaClient(ctx, os.Getenv("STELLA_SERVICE"))

	paxumClient := &http.Client{}

	return createApplication(ctx,
			adapters.NewEvaGrpc(evaClient),
			adapters.NewStellaGrpc(stellaClient),
			clients.NewTemporalClient(ctx),
			paxumClient,
		),
		func() {
			cleanup()
			cleanup2()
		}
}

func NewComponentTestApplication(ctx context.Context) (app.Application, func(), *mocks.Client) {

	bootstrap.NewBootstrap(ctx)

	evaClient, cleanup := clients.NewEvaClient(ctx, os.Getenv("EVA_SERVICE"))

	temporalClient := &mocks.Client{}

	return createApplication(ctx,
			// kind of "mock" eva, it will read off a stored database of accounts for testing first before reaching out to eva.
			// this makes testing easier because we can get reproducible tests with each run
			EvaServiceMock{adapter: adapters.NewEvaGrpc(evaClient)},
			StellaServiceMock{},
			temporalClient,
			MockPaxumHttpClient{},
		),
		func() {
			cleanup()
		},
		temporalClient
}

func createApplication(ctx context.Context, eva query.EvaService, stella query.StellaService, client client.Client, paxumClient adapters.PaxumHttpClient) app.Application {

	session := bootstrap.InitializeDatabaseSession()
	esClient := bootstrap.InitializeElasticSearchSession()

	eventRepo := adapters.NewEventTemporalRepository(client)

	paymentRepo := adapters.NewPaymentCassandraRepository(session, esClient)
	payoutRepo := adapters.NewPayoutCassandraElasticsearchRepository(session, esClient)
	balanceRepo := adapters.NewBalanceCassandraRepository(session, stella)
	detailsRepo := adapters.NewDetailsCassandraRepository(session)
	paxumRepo := adapters.NewPaxumHttpCassandraRepository(paxumClient)

	return app.Application{
		Commands: app.Commands{
			CancelClubPayout:                   command.NewCancelClubPayoutHandler(payoutRepo, eventRepo),
			ClubPaymentDeduction:               command.NewClubPaymentDeductionHandler(eventRepo),
			ClubPaymentDeposit:                 command.NewClubPaymentDepositHandler(eventRepo),
			DeleteAccountPayoutMethod:          command.NewDeleteAccountPayoutMethodHandler(payoutRepo),
			InitiateClubPayout:                 command.NewInitiateClubPayoutHandler(payoutRepo, eventRepo),
			RetryClubPayout:                    command.NewRetryClubPayoutHandler(payoutRepo, eventRepo),
			SetPaxumAccountPayoutMethod:        command.NewSetPaxumAccountPayoutMethodHandler(detailsRepo, payoutRepo),
			UpdateAccountDetails:               command.NewUpdateAccountDetailsHandler(detailsRepo),
			UpdateClubPayoutDepositDate:        command.NewUpdateClubPayoutDepositDateHandler(payoutRepo, eventRepo),
			UpdateClubPlatformFee:              command.NewUpdateClubPlatformFeeHandler(paymentRepo),
			DeleteAndRecreateClubPayoutsIndex:  command.NewDeleteAndRecreateClubPayoutsIndexHandler(payoutRepo),
			DeleteAndRecreateClubPaymentsIndex: command.NewDeleteAndRecreateClubPaymentsIndexHandler(paymentRepo),
			DeleteAccountData:                  command.NewDeleteAccountDataHandler(detailsRepo, payoutRepo),
		},
		Queries: app.Queries{
			PrincipalById:           query.NewPrincipalByIdHandler(eva, stella),
			AccountDetailsById:      query.NewAccountDetailsByIdHandler(detailsRepo),
			AccountPayoutMethodById: query.NewAccountPayoutMethodsByIdHandler(payoutRepo),
			ClubBalanceById:         query.NewClubBalanceByIdHandlerHandler(balanceRepo),
			ClubPaymentById:         query.NewClubPaymentByIdHandler(paymentRepo),
			ClubPayoutById:          query.NewClubPayoutByIdHandler(payoutRepo),
			DepositRequestById:      query.NewDepositRequestByIdHandler(payoutRepo),
			ClubPendingBalanceById:  query.NewClubPendingBalanceByIdHandlerHandler(balanceRepo),
			Countries:               query.NewCountriesHandler(),
			DepositRequests:         query.NewDepositRequestsHandler(payoutRepo),
			PlatformFeeByClubId:     query.NewPlatformFeeByClubIdHandler(paymentRepo),
			SearchClubPayouts:       query.NewSearchClubPayoutsHandler(payoutRepo),
			SearchClubPayments:      query.NewSearchClubPaymentsHandler(paymentRepo),
		},
		Activities: activities.NewActivitiesHandler(paymentRepo, payoutRepo, balanceRepo, detailsRepo, paxumRepo, stella),
	}
}
