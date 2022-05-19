package billing

import (
	"context"
	"overdoll/libraries/location"
	"overdoll/libraries/money"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
)

type Repository interface {
	SearchAccountClubSupporterSubscriptions(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, filters *AccountClubSupporterSubscriptionFilters) ([]*AccountClubSupporterSubscription, error)
	GetAccountClubSupporterSubscriptionById(ctx context.Context, requester *principal.Principal, id string) (*AccountClubSupporterSubscription, error)
	HasActiveOrCancelledAccountClubSupporterSubscriptions(ctx context.Context, requester *principal.Principal, accountId string) (*bool, error)

	GetAccountActiveClubSupporterSubscriptionsOperator(ctx context.Context, accountId string) ([]*AccountClubSupporterSubscription, error)

	GetAccountSavedPaymentMethods(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, accountId string) ([]*SavedPaymentMethod, error)
	DeleteAccountSavedPaymentMethod(ctx context.Context, requester *principal.Principal, accountId, id string) error
	GetCCBillSubscriptionDetailsById(ctx context.Context, requester *principal.Principal, ccbillSubscriptionId string) (*CCBillSubscriptionDetails, error)
	GetAccountSavedPaymentMethodById(ctx context.Context, requester *principal.Principal, accountId, id string) (*SavedPaymentMethod, error)

	GetExpiredAccountClubSupporterSubscriptionsByAccount(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, accountId string) ([]*ExpiredAccountClubSupporterSubscription, error)
	GetExpiredAccountClubSupporterSubscriptionByAccountAndClubIdOperator(ctx context.Context, accountId, clubId string) (*ExpiredAccountClubSupporterSubscription, error)
	DeleteExpiredAccountClubSupporterSubscriptionOperator(ctx context.Context, accountId, clubId string) error
	CreateExpiredAccountClubSupporterSubscriptionOperator(ctx context.Context, expired *ExpiredAccountClubSupporterSubscription) error

	GetAccountClubSupporterSubscriptionByIdOperator(ctx context.Context, id string) (*AccountClubSupporterSubscription, error)
	CreateAccountClubSupporterSubscriptionOperator(ctx context.Context, accountClubSupp *AccountClubSupporterSubscription) error
	UpdateAccountClubSupporterSubscriptionStatusOperator(ctx context.Context, id string, updateFn func(subscription *AccountClubSupporterSubscription) error) (*AccountClubSupporterSubscription, error)
	UpdateAccountClubSupporterBillingDateOperator(ctx context.Context, id string, updateFn func(subscription *AccountClubSupporterSubscription) error) (*AccountClubSupporterSubscription, error)
	UpdateAccountClubSupporterPaymentMethodOperator(ctx context.Context, id string, updateFn func(subscription *AccountClubSupporterSubscription) error) (*AccountClubSupporterSubscription, error)
	HasExistingAccountClubSupporterSubscription(ctx context.Context, requester *principal.Principal, accountId, clubId string) (*AccountClubSupporterSubscription, error)
	HasExistingAccountClubSupporterSubscriptionOperator(ctx context.Context, accountId, clubId string) (*AccountClubSupporterSubscription, error)
	UpdateAccountClubSupporterCancelOperator(ctx context.Context, id string, updateFn func(subscription *AccountClubSupporterSubscription) error) (*AccountClubSupporterSubscription, error)

	CreateAccountSavedPaymentMethodOperator(ctx context.Context, savedPaymentMethod *SavedPaymentMethod) error
	GetAccountSavedPaymentMethodByIdOperator(ctx context.Context, accountId, id string) (*SavedPaymentMethod, error)
	UpdateAccountSavedPaymentMethodOperator(ctx context.Context, accountId, id string, updateFn func(savedPaymentMethod *SavedPaymentMethod) error) (*SavedPaymentMethod, error)

	GetAccountTransactionById(ctx context.Context, requester *principal.Principal, transactionHistoryId string) (*AccountTransaction, error)
	GetAccountTransactionByCCBillTransactionIdOperator(ctx context.Context, ccbillTransactionId string) (*AccountTransaction, error)
	CreateAccountTransactionOperator(ctx context.Context, accountHistory *AccountTransaction) error
	GetAccountTransactionByIdOperator(ctx context.Context, transactionHistoryId string) (*AccountTransaction, error)
	UpdateAccountTransactionOperator(ctx context.Context, id string, updateFn func(transaction *AccountTransaction) error) (*AccountTransaction, error)

	GetCCBillSubscriptionDetailsByIdOperator(ctx context.Context, ccbillSubscriptionId string) (*CCBillSubscriptionDetails, error)
	CreateCCBillSubscriptionDetailsOperator(ctx context.Context, subscription *CCBillSubscriptionDetails) error
	UpdateCCBillSubscriptionDetailsPaymentMethodOperator(ctx context.Context, ccbillSubscriptionId string, updateFn func(subscription *CCBillSubscriptionDetails) error) (*CCBillSubscriptionDetails, error)

	GetAccountTransactionsCount(ctx context.Context, requester *principal.Principal, accountId string, states []Transaction) (*int64, error)
	SearchAccountTransactions(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, filters *AccountTransactionsFilters) ([]*AccountTransaction, error)

	DeleteAccountData(ctx context.Context, accountId string) error

	GetActiveClubSupporterSubscriptionsForClub(ctx context.Context, clubId string) ([]string, error)

	GetCancellationReasonById(ctx context.Context, id string) (*CancellationReason, error)
	GetCancellationReasons(ctx context.Context, cursor *paging.Cursor, deprecated bool) ([]*CancellationReason, error)

	CreateCancellationReason(ctx context.Context, reason *CancellationReason) error
	UpdateCancellationReasonTitle(ctx context.Context, reasonId string, updateFn func(reason *CancellationReason) error) (*CancellationReason, error)
	UpdateCancellationReasonDeprecated(ctx context.Context, reasonId string, updateFn func(reason *CancellationReason) error) (*CancellationReason, error)
}

type FileRepository interface {
	GetOrCreateClubSupporterRefundReceiptFromAccountTransaction(ctx context.Context, requester *principal.Principal, history *AccountTransaction, eventId string) (*ClubSupporterReceipt, error)
	GetOrCreateClubSupporterPaymentReceiptFromAccountTransaction(ctx context.Context, requester *principal.Principal, history *AccountTransaction) (*ClubSupporterReceipt, error)
	UpdateClubSupporterRefundReceiptWithNewFile(ctx context.Context, builder *ClubSupporterRefundReceiptBuilder) error
	UpdateClubSupporterPaymentReceiptWithNewFile(ctx context.Context, builder *ClubSupporterPaymentReceiptBuilder) error
}

type PricingRepository interface {
	GetClubSupporterPricingForLocation(ctx context.Context, location *location.Location, clubId string) (*Price, error)
	GetClubSupporterPricingForCurrency(ctx context.Context, currency money.Currency, clubId string) (*Price, error)
	GetClubSupporterAllPricing(ctx context.Context, clubId string) ([]*Price, error)
}
