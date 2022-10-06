package service

import (
	"context"
	"go.temporal.io/sdk/client"
	temporalmocks "go.temporal.io/sdk/mocks"
	"net/http"
	"os"
	"overdoll/applications/hades/internal/adapters"
	"overdoll/applications/hades/internal/app"
	"overdoll/applications/hades/internal/app/command"
	"overdoll/applications/hades/internal/app/query"
	"overdoll/applications/hades/internal/app/workflows/activities"
	"overdoll/libraries/testing_tools/mocks"

	"overdoll/libraries/bootstrap"
	"overdoll/libraries/clients"
)

func NewApplication(ctx context.Context) (*app.Application, func()) {

	// bootstrap application
	bootstrap.NewBootstrap()

	evaClient, cleanup := clients.NewEvaClient(ctx, os.Getenv("EVA_SERVICE"))
	stingClient, cleanup2 := clients.NewStingClient(ctx, os.Getenv("STING_SERVICE"))
	carrierClient, cleanup3 := clients.NewCarrierClient(ctx, os.Getenv("CARRIER_SERVICE"))
	ringerClient, cleanup4 := clients.NewRingerClient(ctx, os.Getenv("RINGER_SERVICE"))

	ccbillClient := &http.Client{}

	return createApplication(ctx,
			adapters.NewEvaGrpc(evaClient),
			adapters.NewStingGrpc(stingClient),
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

type ComponentTestApplication struct {
	App            *app.Application
	TemporalClient *temporalmocks.Client
	EvaClient      *mocks.MockEvaClient
	CarrierClient  *mocks.MockCarrierClient
	StingClient    *mocks.MockStingClient
	RingerClient   *mocks.MockRingerClient
}

func NewComponentTestApplication(ctx context.Context) *ComponentTestApplication {
	bootstrap.NewBootstrap()
	temporalClient := &temporalmocks.Client{}

	evaClient := &mocks.MockEvaClient{}
	stingClient := &mocks.MockStingClient{}
	carrierClient := &mocks.MockCarrierClient{}
	ringerClient := &mocks.MockRingerClient{}

	return &ComponentTestApplication{
		App: createApplication(
			ctx,
			adapters.NewEvaGrpc(evaClient),
			adapters.NewStingGrpc(stingClient),
			adapters.NewCarrierGrpc(carrierClient),
			adapters.NewRingerGrpc(ringerClient),
			MockCCBillHttpClient{},
			temporalClient,
		),
		TemporalClient: temporalClient,
		EvaClient:      evaClient,
		CarrierClient:  carrierClient,
		StingClient:    stingClient,
		RingerClient:   ringerClient,
	}
}

func createApplication(ctx context.Context, eva query.EvaService, sting command.StingService, carrier command.CarrierService, ringer command.RingerService, ccbillClient adapters.CCBillHttpClient, client client.Client) *app.Application {

	session := bootstrap.InitializeDatabaseSession()
	esClient := bootstrap.InitializeElasticSearchSession()
	awsSession := bootstrap.InitializeAWSSession()

	eventRepo := adapters.NewEventTemporalRepository(client)
	billingRepo := adapters.NewBillingCassandraRepository(session, esClient)
	pricingRepo := adapters.NewBillingPricingRepository(session)
	billingFileRepo := adapters.NewBillingCassandraS3TemporalFileRepository(session, awsSession, client)
	ccbillRepo := adapters.NewCCBillHttpRepository(ccbillClient)
	metricRepo := adapters.NewMetricsCassandraRepository(session)

	return &app.Application{
		Commands: app.Commands{
			CreateCancellationReason:                                         command.NewCreateCancellationReasonHandler(billingRepo),
			UpdateCancellationReasonDeprecated:                               command.NewUpdateCancellationReasonDeprecatedHandler(billingRepo),
			UpdateCancellationReasonTitle:                                    command.NewUpdateCancellationReasonTitleHandler(billingRepo),
			GenerateCCBillFlexFormsPaymentLink:                               command.NewGenerateCCBillFlexFormsPaymentLink(),
			ParseCCBillFlexFormsResponseAndGenerateTemplate:                  command.NewParseCCBillFlexFormsResponseAndGenerateTemplate(),
			GenerateCCBillClubSupporterPaymentLink:                           command.NewGenerateCCBillClubSupportPaymentLinkHandler(billingRepo, pricingRepo, sting),
			ProcessCCBillWebhook:                                             command.NewProcessCCBillWebhookHandler(eventRepo),
			GenerateProratedRefundAmountForAccountTransaction:                command.NewGenerateProratedRefundAmountForAccountTransactionHandler(billingRepo),
			BecomeClubSupporterWithAccountSavedPaymentMethod:                 command.NewBecomeClubSupporterWithAccountSavedPaymentMethodHandler(billingRepo, pricingRepo, ccbillRepo, sting),
			CancelAccountClubSupporterSubscription:                           command.NewCancelAccountClubSupporterSubscriptionHandler(billingRepo, eventRepo),
			DeleteAccountSavedPaymentMethod:                                  command.NewDeleteAccountSavedPaymentMethodHandler(billingRepo),
			RefundAccountTransaction:                                         command.NewRefundAccountTransactionHandler(billingRepo, ccbillRepo),
			GenerateClubSupporterRefundReceiptFromAccountTransactionHistory:  command.NewGenerateClubSupporterRefundReceiptFromAccountTransaction(billingRepo, billingFileRepo),
			ExtendAccountClubSupporterSubscription:                           command.NewExtendAccountClubSupporterSubscription(billingRepo, ccbillRepo),
			GenerateClubSupporterPaymentReceiptFromAccountTransactionHistory: command.NewGenerateClubSupporterPaymentReceiptFromAccountTransaction(billingRepo, billingFileRepo),
			DeleteAccountData:                                                command.NewDeleteAccountDataHandler(billingRepo),
			CancelActiveSupporterSubscriptionsForClub:                        command.NewCancelActiveSubscriptionsForClubHandler(eventRepo),
		},
		Queries: app.Queries{
			PrincipalById:                                      query.NewPrincipalByIdHandler(eva, sting),
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
		Activities: activities.NewActivitiesHandler(billingRepo, metricRepo, billingFileRepo, ccbillRepo, sting, carrier, ringer),
	}
}
