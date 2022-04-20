package service

import (
	"context"
	"go.temporal.io/sdk/client"
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

	ccbillClient := &http.Client{}

	return createApplication(ctx,
			adapters.NewEvaGrpc(evaClient),
			adapters.NewStellaGrpc(stellaClient),
			clients.NewTemporalClient(ctx),
			ccbillClient,
		),
		func() {
			cleanup()
			cleanup2()
		}
}

func createApplication(ctx context.Context, eva query.EvaService, stella query.StellaService, client client.Client, paxumClient adapters.PaxumHttpClient) app.Application {

	session := bootstrap.InitializeDatabaseSession()
	esClient := bootstrap.InitializeElasticSearchSession()

	eventRepo := adapters.NewEventTemporalRepository(client)

	paymentRepo := adapters.NewPaymentCassandraRepository(session, stella)
	paymentIndexRepo := adapters.NewPaymentIndexElasticSearchRepository(esClient, session, stella)
	payoutRepo := adapters.NewPayoutCassandraRepository(session, stella)
	payoutIndexRepo := adapters.NewPayoutIndexElasticSearchRepository(esClient, session, stella)
	balanceRepo := adapters.NewBalanceCassandraRepository(session, stella)
	detailsRepo := adapters.NewDetailsCassandraRepository(session)
	paxumRepo := adapters.NewPaxumHttpCassandraRepository(paxumClient)

	return app.Application{
		Commands: app.Commands{
			CancelClubPayout:            command.NewCancelClubPayoutHandler(payoutRepo, eventRepo),
			ClubPaymentDeduction:        command.NewClubPaymentDeductionHandler(eventRepo),
			ClubPaymentDeposit:          command.NewClubPaymentDepositHandler(eventRepo),
			DeleteAccountPayoutMethod:   command.NewDeleteAccountPayoutMethodHandler(payoutRepo),
			InitiateClubPayout:          command.NewInitiateClubPayoutHandler(payoutRepo, eventRepo),
			RetryClubPayout:             command.NewRetryClubPayoutHandler(payoutRepo, eventRepo),
			SetPaxumAccountPayoutMethod: command.NewSetPaxumAccountPayoutMethodHandler(detailsRepo, payoutRepo),
			UpdateAccountDetails:        command.NewUpdateAccountDetailsHandler(detailsRepo),
			UpdateClubPayoutDepositDate: command.NewUpdateClubPayoutDepositDateHandler(payoutRepo, eventRepo),
			UpdateClubPlatformFee:       command.NewUpdateClubPlatformFeeHandler(paymentRepo),
			IndexAllClubPayouts:         command.NewIndexAllClubPayoutsHandler(payoutIndexRepo),
			IndexAllClubPayments:        command.NewIndexAllClubPaymentsHandler(paymentIndexRepo),
		},
		Queries: app.Queries{
			PrincipalById:           query.NewPrincipalByIdHandler(eva, eventRepo),
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
			SearchClubPayouts:       query.NewSearchClubPayoutsHandler(payoutIndexRepo),
			SearchClubPayments:      query.NewSearchClubPaymentsHandler(paymentIndexRepo),
		},
		Activities: activities.NewActivitiesHandler(paymentRepo, paymentIndexRepo, payoutRepo, payoutIndexRepo, balanceRepo, detailsRepo, paxumRepo),
	}
}
