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

	DeleteAndRecreateAccountTransactionsIndex command.DeleteAndRecreateAccountTransactionsIndexHandler

	ProcessCCBillWebhook                                             command.ProcessCCBillWebhookHandler
	GenerateProratedRefundAmountForAccountTransaction                command.GenerateProratedRefundAmountForAccountTransactionHandler
	BecomeClubSupporterWithAccountSavedPaymentMethod                 command.BecomeClubSupporterWithAccountSavedPaymentMethodHandler
	CancelAccountClubSupporterSubscription                           command.CancelAccountClubSupporterSubscriptionHandler
	DeleteAccountSavedPaymentMethod                                  command.DeleteAccountSavedPaymentMethodHandler
	RefundAccountTransaction                                         command.RefundAccountTransactionHandler
	ExtendAccountClubSupporterSubscription                           command.ExtendAccountClubSupporterSubscriptionHandler
	GenerateClubSupporterPaymentReceiptFromAccountTransactionHistory command.GenerateClubSupporterPaymentReceiptFromAccountTransactionHandler
	GenerateClubSupporterRefundReceiptFromAccountTransactionHistory  command.GenerateClubSupporterRefundReceiptFromAccountTransactionHandler

	CreateCancellationReason           command.CreateCancellationReasonHandler
	UpdateCancellationReasonDeprecated command.UpdateCancellationReasonDeprecatedHandler
	UpdateCancellationReasonTitle      command.UpdateCancellationReasonTitleHandler
}

type Queries struct {
	PrincipalById query.PrincipalByIdHandler

	CCBillSubscriptionDetails query.CCBillSubscriptionDetailsHandler
	CCBillTransactionDetails  query.CCBillTransactionDetailsHandler

	ExpiredAccountClubSupporterSubscriptionsByAccount query.ExpiredAccountClubSupporterSubscriptionsByAccountHandler
	AccountClubSupporterSubscriptionById              query.AccountClubSupporterSubscriptionByIdHandler
	SearchAccountClubSupporterSubscriptions           query.SearchAccountClubSupporterSubscriptionsHandler
	AccountSavedPaymentMethods                        query.AccountSavedPaymentMethodsHandler
	ClubSupporterPricing                              query.ClubSupporterPricingHandler
	ClubSupporterSubscriptionFinalized                query.ClubSupporterSubscriptionFinalizedHandler

	CancellationReasons    query.CancellationReasonsHandler
	CancellationReasonById query.CancellationReasonByIdHandler

	AccountTransactionById             query.AccountTransactionByIdHandler
	SearchAccountTransactions          query.SearchAccountTransactionsHandler
	AccountTransactionsTotalCount      query.AccountTransactionsTotalCountHandler
	AccountTransactionsChargebackCount query.AccountTransactionsChargebackCountHandler
	AccountTransactionsPaymentCount    query.AccountTransactionsPaymentCountHandler
	AccountTransactionsRefundCount     query.AccountTransactionsRefundCountHandler
}
