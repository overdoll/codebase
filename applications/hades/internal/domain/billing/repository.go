package billing

import (
	"context"
	"overdoll/libraries/location"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
)

type Repository interface {
	SearchAccountClubSupporterSubscriptions(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, filters *AccountClubSupporterSubscriptionFilters) ([]*AccountClubSupporterSubscription, error)
	GetAccountClubSupporterSubscriptionById(ctx context.Context, requester *principal.Principal, id string) (*AccountClubSupporterSubscription, error)
	GetAccountSavedPaymentMethods(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, accountId string) ([]*SavedPaymentMethod, error)
	DeleteAccountSavedPaymentMethod(ctx context.Context, requester *principal.Principal, accountId, id string) error
	SearchAccountTransactions(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, filters *AccountTransactionHistoryFilters) ([]*AccountTransaction, error)
	GetCCBillSubscriptionDetailsById(ctx context.Context, requester *principal.Principal, ccbillSubscriptionId string) (*CCBillSubscriptionDetails, error)
	GetAccountSavedPaymentMethodById(ctx context.Context, requester *principal.Principal, accountId, id string) (*SavedPaymentMethod, error)

	GetExpiredAccountClubSupporterSubscriptionsByAccount(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, accountId string) ([]*ExpiredAccountClubSupporterSubscription, error)
	GetExpiredAccountClubSupporterSubscriptionByAccountAndClubIdOperator(ctx context.Context, accountId, clubId string) (*ExpiredAccountClubSupporterSubscription, error)
	DeleteExpiredAccountClubSupporterSubscriptionOperator(ctx context.Context, accountId, clubId string) error
	CreateExpiredAccountClubSupporterSubscriptionOperator(ctx context.Context, expired *ExpiredAccountClubSupporterSubscription) error

	GetAccountClubSupporterSubscriptionByIdOperator(ctx context.Context, id string) (*AccountClubSupporterSubscription, error)
	DeleteAccountClubSupporterSubscriptionOperator(ctx context.Context, subscription *AccountClubSupporterSubscription) error
	CreateAccountClubSupporterSubscriptionOperator(ctx context.Context, accountClubSupp *AccountClubSupporterSubscription) error
	UpdateAccountClubSupporterSubscriptionStatusOperator(ctx context.Context, id string, updateFn func(subscription *AccountClubSupporterSubscription) error) (*AccountClubSupporterSubscription, error)
	UpdateAccountClubSupporterBillingDateOperator(ctx context.Context, id string, updateFn func(subscription *AccountClubSupporterSubscription) error) (*AccountClubSupporterSubscription, error)
	UpdateAccountClubSupporterPaymentMethodOperator(ctx context.Context, id string, updateFn func(subscription *AccountClubSupporterSubscription) error) (*AccountClubSupporterSubscription, error)
	HasExistingAccountClubSupporterSubscription(ctx context.Context, requester *principal.Principal, accountId, clubId string) (*AccountClubSupporterSubscription, error)
	HasExistingAccountClubSupporterSubscriptionOperator(ctx context.Context, accountId, clubId string) (*AccountClubSupporterSubscription, error)
	UpdateAccountClubSupporterCancel(ctx context.Context, requester *principal.Principal, id string, updateFn func(subscription *AccountClubSupporterSubscription) error) (*AccountClubSupporterSubscription, error)

	CreateAccountSavedPaymentMethodOperator(ctx context.Context, savedPaymentMethod *SavedPaymentMethod) error
	GetAccountSavedPaymentMethodByIdOperator(ctx context.Context, accountId, id string) (*SavedPaymentMethod, error)
	UpdateAccountSavedPaymentMethodOperator(ctx context.Context, accountId, id string, updateFn func(savedPaymentMethod *SavedPaymentMethod) error) (*SavedPaymentMethod, error)

	GetAccountTransactionById(ctx context.Context, requester *principal.Principal, transactionHistoryId string) (*AccountTransaction, error)
	CreateAccountTransactionOperator(ctx context.Context, accountHistory *AccountTransaction) error
	GetAccountTransactionByIdOperator(ctx context.Context, transactionHistoryId string) (*AccountTransaction, error)
	UpdateAccountTransactionOperator(ctx context.Context, id string, updateFn func(transaction *AccountTransaction) error) (*AccountTransaction, error)

	GetCCBillSubscriptionDetailsByIdOperator(ctx context.Context, ccbillSubscriptionId string) (*CCBillSubscriptionDetails, error)
	CreateCCBillSubscriptionDetailsOperator(ctx context.Context, subscription *CCBillSubscriptionDetails) error
	UpdateCCBillSubscriptionDetailsPaymentMethodOperator(ctx context.Context, ccbillSubscriptionId string, updateFn func(subscription *CCBillSubscriptionDetails) error) (*CCBillSubscriptionDetails, error)
}

type IndexRepository interface {
	GetAccountTransactionsCount(ctx context.Context, requester *principal.Principal, accountId string, state *Transaction) (*int64, error)

	IndexAccountTransaction(ctx context.Context, accountTransaction *AccountTransaction) error
}

type FileRepository interface {
	GetOrCreateClubSupporterRefundReceiptFromAccountTransaction(ctx context.Context, history *AccountTransaction, eventId string) (*ClubSupporterReceipt, error)
	GetOrCreateClubSupporterPaymentReceiptFromAccountTransaction(ctx context.Context, history *AccountTransaction) (*ClubSupporterReceipt, error)
	UpdateClubSupporterPaymentReceiptWithNewFile(ctx context.Context, builder *ClubSupporterPaymentReceiptBuilder) error
}

type PricingRepository interface {
	GetClubSupporterPricingForLocation(ctx context.Context, location *location.Location, clubId string) (*Price, error)
	GetClubSupporterPricingForCurrency(ctx context.Context, currency Currency, clubId string) (*Price, error)
	GetClubSupporterAllPricing(ctx context.Context, clubId string) ([]*Price, error)
}
