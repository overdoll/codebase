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

	ccbillClient := &http.Client{}

	return createApplication(ctx,
			adapters.NewEvaGrpc(evaClient),
			adapters.NewStellaGrpc(stellaClient),
			adapters.NewCarrierGrpc(carrierClient),
			ccbillClient,
			clients.NewTemporalClient(ctx),
		),
		func() {
			cleanup()
			cleanup2()
			cleanup3()
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
			MockCCBillHttpClient{},
			temporalClient,
		),
		func() {
			cleanup()
		},
		temporalClient
}

func createApplication(ctx context.Context, eva query.EvaService, stella command.StellaService, carrier command.CarrierService, ccbillClient adapters.CCBillHttpClient, client client.Client) app.Application {

	session := bootstrap.InitializeDatabaseSession()

	awsSession := bootstrap.InitializeAWSSession()

	eventRepo := adapters.NewEventTemporalRepository(client)
	billingRepo := adapters.NewBillingCassandraRepository(session)
	pricingRepo := adapters.NewBillingPricingRepository()
	billingFileRepo := adapters.NewBillingCassandraS3TemporalFileRepository(session, awsSession, client)
	ccbillRepo := adapters.NewCCBillHttpRepository(ccbillClient)
	cancelRepo := adapters.NewCancellationCassandraRepository(session)

	return app.Application{
		Commands: app.Commands{
			CreateCancellationReason:                                         command.NewCreateCancellationReasonHandler(cancelRepo),
			UpdateCancellationReasonDeprecated:                               command.NewUpdateCancellationReasonDeprecatedHandler(cancelRepo),
			UpdateCancellationReasonTitle:                                    command.NewUpdateCancellationReasonTitleHandler(cancelRepo),
			GenerateCCBillFlexFormsPaymentLink:                               command.NewGenerateCCBillFlexFormsPaymentLink(),
			ParseCCBillFlexFormsResponseAndGenerateTemplate:                  command.NewParseCCBillFlexFormsResponseAndGenerateTemplate(),
			GenerateCCBillClubSupporterPaymentLink:                           command.NewGenerateCCBillClubSupportPaymentLinkHandler(billingRepo, pricingRepo, stella, eva),
			ProcessCCBillWebhook:                                             command.NewProcessCCBillWebhookHandler(eventRepo),
			GenerateProratedRefundAmountForAccountTransaction:                command.NewGenerateProratedRefundAmountForAccountTransactionHandler(billingRepo),
			BecomeClubSupporterWithAccountSavedPaymentMethod:                 command.NewBecomeClubSupporterWithAccountSavedPaymentMethodHandler(billingRepo, pricingRepo, ccbillRepo, stella, eva),
			CancelAccountClubSupporterSubscription:                           command.NewCancelAccountClubSupporterSubscriptionHandler(billingRepo, ccbillRepo, cancelRepo),
			DeleteAccountSavedPaymentMethod:                                  command.NewDeleteAccountSavedPaymentMethodHandler(billingRepo),
			RefundAccountTransaction:                                         command.NewRefundAccountTransactionHandler(billingRepo, ccbillRepo),
			ExtendAccountClubSupporterSubscription:                           command.NewExtendAccountClubSupporterSubscription(billingRepo, ccbillRepo),
			GenerateClubSupporterPaymentReceiptFromAccountTransactionHistory: command.NewGenerateClubSupporterPaymentReceiptFromAccountTransaction(billingRepo, billingFileRepo),
		},
		Queries: app.Queries{
			PrincipalById:                                     query.NewPrincipalByIdHandler(eva),
			SearchAccountClubSupporterSubscription:            query.NewSearchAccountClubSupporterSubscriptionsHandler(billingRepo),
			ExpiredAccountClubSupporterSubscriptionsByAccount: query.NewExpiredAccountClubSupporterSubscriptionsByAccountHandler(billingRepo),
			AccountTransactionById:                            query.NewAccountTransactionByIdHandler(billingRepo),
			AccountClubSupporterSubscriptionById:              query.NewAccountClubSupporterSubscriptionByIdHandler(billingRepo),
			AccountSavedPaymentMethods:                        query.NewAccountSavedPaymentMethodsHandler(billingRepo),
			SearchAccountTransactionHistory:                   query.NewSearchAccountTransactionsHandler(billingRepo),
			CCBillSubscriptionDetails:                         query.NewCCBillSubscriptionDetailsHandler(billingRepo, ccbillRepo),
			ClubSupporterPricing:                              query.NewClubSupporterPricingHandler(pricingRepo, eva),
			ClubSupporterSubscriptionFinalized:                query.NewClubSupporterSubscriptionFinalized(billingRepo),
			CancellationReasonById:                            query.NewCancellationReasonByIdHandler(cancelRepo),
			CancellationReasons:                               query.NewCancellationReasonsHandler(cancelRepo),
			CCBillTransactionDetails:                          query.NewCCBillTransactionDetailsHandler(),
		},
		Activities: activities.NewActivitiesHandler(billingRepo, billingFileRepo, ccbillRepo, stella, carrier),
	}
}
