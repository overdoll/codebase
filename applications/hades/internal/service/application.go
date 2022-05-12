package service

import (
	"context"
	"go.temporal.io/sdk/client"
	"go.temporal.io/sdk/mocks"
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
	carrierClient, cleanup3 := clients.NewCarrierClient(ctx, os.Getenv("CARRIER_SERVICE"))
	ringerClient, cleanup4 := clients.NewRingerClient(ctx, os.Getenv("RINGER_SERVICE"))

	ccbillClient := &http.Client{}

	return createApplication(ctx,
			adapters.NewEvaGrpc(evaClient),
			adapters.NewStellaGrpc(stellaClient),
			adapters.NewCarrierGrpc(carrierClient),
			adapters.NewRingerGrpc(ringerClient),
			ccbillClient,
			clients.NewTemporalClient(ctx),
		),
		func() {
			cleanup()
			cleanup2()
			cleanup3()
			cleanup4()
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
			CarrierServiceMock{},
			RingerServiceMock{},
			MockCCBillHttpClient{},
			temporalClient,
		),
		func() {
			cleanup()
		},
		temporalClient
}

func createApplication(ctx context.Context, eva query.EvaService, stella command.StellaService, carrier command.CarrierService, ringer command.RingerService, ccbillClient adapters.CCBillHttpClient, client client.Client) app.Application {

	session := bootstrap.InitializeDatabaseSession()
	esClient := bootstrap.InitializeElasticSearchSession()
	awsSession := bootstrap.InitializeAWSSession()

	eventRepo := adapters.NewEventTemporalRepository(client)
	billingRepo := adapters.NewBillingCassandraRepository(session, esClient)
	pricingRepo := adapters.NewBillingPricingRepository()
	billingFileRepo := adapters.NewBillingCassandraS3TemporalFileRepository(session, awsSession, client)
	ccbillRepo := adapters.NewCCBillHttpRepository(ccbillClient)
	metricRepo := adapters.NewMetricsCassandraRepository(session)

	return app.Application{
		Commands: app.Commands{
			CreateCancellationReason:                                         command.NewCreateCancellationReasonHandler(billingRepo),
			UpdateCancellationReasonDeprecated:                               command.NewUpdateCancellationReasonDeprecatedHandler(billingRepo),
			UpdateCancellationReasonTitle:                                    command.NewUpdateCancellationReasonTitleHandler(billingRepo),
			GenerateCCBillFlexFormsPaymentLink:                               command.NewGenerateCCBillFlexFormsPaymentLink(),
			ParseCCBillFlexFormsResponseAndGenerateTemplate:                  command.NewParseCCBillFlexFormsResponseAndGenerateTemplate(),
			GenerateCCBillClubSupporterPaymentLink:                           command.NewGenerateCCBillClubSupportPaymentLinkHandler(billingRepo, pricingRepo, stella, eva),
			ProcessCCBillWebhook:                                             command.NewProcessCCBillWebhookHandler(eventRepo),
			GenerateProratedRefundAmountForAccountTransaction:                command.NewGenerateProratedRefundAmountForAccountTransactionHandler(billingRepo),
			BecomeClubSupporterWithAccountSavedPaymentMethod:                 command.NewBecomeClubSupporterWithAccountSavedPaymentMethodHandler(billingRepo, pricingRepo, ccbillRepo, stella, eva),
			CancelAccountClubSupporterSubscription:                           command.NewCancelAccountClubSupporterSubscriptionHandler(billingRepo),
			DeleteAccountSavedPaymentMethod:                                  command.NewDeleteAccountSavedPaymentMethodHandler(billingRepo),
			RefundAccountTransaction:                                         command.NewRefundAccountTransactionHandler(billingRepo, ccbillRepo),
			GenerateClubSupporterRefundReceiptFromAccountTransactionHistory:  command.NewGenerateClubSupporterRefundReceiptFromAccountTransaction(billingRepo, billingFileRepo),
			ExtendAccountClubSupporterSubscription:                           command.NewExtendAccountClubSupporterSubscription(billingRepo, ccbillRepo),
			GenerateClubSupporterPaymentReceiptFromAccountTransactionHistory: command.NewGenerateClubSupporterPaymentReceiptFromAccountTransaction(billingRepo, billingFileRepo),
			DeleteAndRecreateAccountTransactionsIndex:                        command.NewDeleteAndRecreateAccountTransactionsIndexHandler(billingRepo),
			DeleteAndRecreateAccountClubSupporterSubscriptionsIndex:          command.NewDeleteAndRecreateAccountClubSupporterSubscriptionsIndexHandler(billingRepo),
			DeleteAccountData:                                                command.NewDeleteAccountDataHandler(billingRepo),
			CancelActiveSupporterSubscriptionsForClub:                        command.NewCancelActiveSubscriptionsForClubHandler(eventRepo),
		},
		Queries: app.Queries{
			PrincipalById:                                      query.NewPrincipalByIdHandler(eva, stella),
			SearchAccountClubSupporterSubscriptions:            query.NewSearchAccountClubSupporterSubscriptionsHandler(billingRepo),
			ExpiredAccountClubSupporterSubscriptionsByAccount:  query.NewExpiredAccountClubSupporterSubscriptionsByAccountHandler(billingRepo),
			AccountClubSupporterSubscriptionById:               query.NewAccountClubSupporterSubscriptionByIdHandler(billingRepo),
			AccountClubSupporterSubscriptionByAccountAndClubId: query.NewAccountClubSupporterSubscriptionByAccountAndClubIdHandler(billingRepo),
			AccountSavedPaymentMethods:                         query.NewAccountSavedPaymentMethodsHandler(billingRepo),
			CCBillSubscriptionDetails:                          query.NewCCBillSubscriptionDetailsHandler(billingRepo, ccbillRepo),
			ClubSupporterPricing:                               query.NewClubSupporterPricingHandler(pricingRepo, eva),
			CancellationReasonById:                             query.NewCancellationReasonByIdHandler(billingRepo),
			CancellationReasons:                                query.NewCancellationReasonsHandler(billingRepo),
			CCBillTransactionDetails:                           query.NewCCBillTransactionDetailsHandler(),

			AccountTransactionById:             query.NewAccountTransactionByIdHandler(billingRepo),
			SearchAccountTransactions:          query.NewSearchAccountTransactionsHandler(billingRepo),
			AccountTransactionsChargebackCount: query.NewAccountTransactionsChargebackCountHandler(billingRepo),
			AccountTransactionsRefundCount:     query.NewAccountTransactionsRefundCountHandler(billingRepo),
			AccountTransactionsPaymentCount:    query.NewAccountTransactionsPaymentCountHandler(billingRepo),
			AccountTransactionsTotalCount:      query.NewAccountTransactionsCountHandler(billingRepo),

			HasActiveOrCancelledAccountClubSupporterSubscriptions: query.NewHasActiveOrCancelledAccountClubSupporterSubscriptionsHandler(billingRepo),
			CanDeleteAccountData:   query.NewCanDeleteAccountDataHandler(billingRepo),
			ClubTransactionMetrics: query.NewClubTransactionMetricsHandler(metricRepo),
		},
		Activities: activities.NewActivitiesHandler(billingRepo, metricRepo, billingFileRepo, ccbillRepo, stella, carrier, ringer),
	}
}
