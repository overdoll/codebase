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
	GenerateCCBillClubSupporterPaymentLink          command.GenerateCCBillClubSupportPaymentLinkHandler
	GenerateCCBillFlexFormsPaymentLink              command.GenerateCCBillFlexFormsPaymentLinkHandler
	ParseCCBillFlexFormsResponseAndGenerateTemplate command.ParseCCBillFlexFormsResponseAndGenerateTemplateHandler

	ProcessCCBillWebhook                                      command.ProcessCCBillWebhookHandler
	GenerateProratedRefundAmountForAccountClubSubscription    command.GenerateProratedRefundAmountForAccountClubSubscriptionHandler
	BecomeClubSupporterWithAccountSavedPaymentMethod          command.BecomeClubSupporterWithAccountSavedPaymentMethodHandler
	CancelAccountClubSupporterSubscription                    command.CancelAccountClubSupporterSubscriptionHandler
	DeleteAccountSavedPaymentMethod                           command.DeleteAccountSavedPaymentMethodHandler
	VoidOrRefundAccountClubSupporterSubscription              command.VoidOrRefundAccountClubSupporterSubscriptionHandler
	ExtendAccountClubSupporterSubscription                    command.ExtendAccountClubSupporterSubscriptionHandler
	GenerateClubSupporterReceiptFromAccountTransactionHistory command.GenerateClubSupporterReceiptFromAccountTransactionHistoryHandler

	CreateCancellationReason           command.CreateCancellationReasonHandler
	UpdateCancellationReasonDeprecated command.UpdateCancellationReasonDeprecatedHandler
	UpdateCancellationReasonTitle      command.UpdateCancellationReasonTitleHandler
}

type Queries struct {
	PrincipalById query.PrincipalByIdHandler

	CCBillSubscriptionDetails query.CCBillSubscriptionDetailsHandler
	CCBillTransactionDetails  query.CCBillTransactionDetailsHandler

	AccountClubSupporterSubscriptions  query.AccountClubSupporterSubscriptionsHandler
	AccountSavedPaymentMethods         query.AccountSavedPaymentMethodsHandler
	AccountTransactionHistory          query.AccountTransactionHistoryHandler
	ClubSupporterPricing               query.ClubSupporterPricingHandler
	ClubSupporterSubscriptionFinalized query.ClubSupporterSubscriptionFinalizedHandler

	CancellationReasons    query.CancellationReasonsHandler
	CancellationReasonById query.CancellationReasonByIdHandler
}