package app

import (
	"overdoll/applications/hades/internal/app/command"
	"overdoll/applications/hades/internal/app/query"
	"overdoll/applications/hades/internal/app/workflows/activities"
)

type Application struct {
	Commands   Commands
	Queries    Queries
	Activities *activities.Activities
}

type Commands struct {
	GenerateCCBillClubSupporterPaymentLink                 command.GenerateCCBillClubSupportPaymentLinkHandler
	ProcessCCBillWebhook                                   command.ProcessCCBillWebhookHandler
	GenerateProratedRefundAmountForAccountClubSubscription command.GenerateProratedRefundAmountForAccountClubSubscriptionHandler
	BecomeClubSupporterWithAccountSavedPaymentMethod       command.BecomeClubSupporterWithAccountSavedPaymentMethodHandler
	CancelAccountClubSupporterSubscription                 command.CancelAccountClubSupporterSubscriptionHandler
	DeleteAccountSavedPaymentMethod                        command.DeleteAccountSavedPaymentMethodHandler
	VoidOrRefundAccountClubSupporterSubscription           command.VoidOrRefundAccountClubSupporterSubscriptionHandler
	ExtendAccountClubSupporterSubscription                 command.ExtendAccountClubSupporterSubscriptionHandler

	CreateCancellationReason           command.CreateCancellationReasonHandler
	UpdateCancellationReasonDeprecated command.UpdateCancellationReasonDeprecatedHandler
	UpdateCancellationReasonTitle      command.UpdateCancellationReasonTitleHandler
}

type Queries struct {
	PrincipalById                      query.PrincipalByIdHandler
	AccountClubSupporterSubscriptions  query.AccountClubSupporterSubscriptionsHandler
	AccountSavedPaymentMethods         query.AccountSavedPaymentMethodsHandler
	AccountTransactionHistory          query.AccountTransactionHistoryHandler
	CCBillSubscriptionDetails          query.CCBillSubscriptionDetailsHandler
	ClubSupporterPricing               query.ClubSupporterPricingHandler
	ClubSupporterSubscriptionFinalized query.ClubSupporterSubscriptionFinalizedHandler

	CancellationReasons    query.CancellationReasonsHandler
	CancellationReasonById query.CancellationReasonById
}
