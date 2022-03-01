package billing

import (
	"context"
	"overdoll/libraries/location"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
)

type Repository interface {
	GetAccountClubSupporterSubscriptions(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, accountId string) ([]*AccountClubSupporterSubscription, error)
	GetAccountClubSupporterSubscriptionById(ctx context.Context, requester *principal.Principal, accountId, clubId, id string) (*AccountClubSupporterSubscription, error)
	GetAccountSavedPaymentMethods(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, accountId string) ([]*SavedPaymentMethod, error)
	DeleteAccountSavedPaymentMethod(ctx context.Context, requester *principal.Principal, accountId, id string) error
	SearchAccountTransactionHistory(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, filters *AccountTransactionHistoryFilters) ([]*AccountTransactionHistory, error)
	GetCCBillSubscriptionDetailsById(ctx context.Context, requester *principal.Principal, ccbillSubscriptionId string) (*CCBillSubscriptionDetails, error)
	GetAccountSavedPaymentMethodById(ctx context.Context, requester *principal.Principal, accountId, id string) (*SavedPaymentMethod, error)

	GetAccountClubSupporterSubscriptionByIdOperator(ctx context.Context, accountId, clubId, id string) (*AccountClubSupporterSubscription, error)
	DeleteAccountClubSupporterSubscriptionOperator(ctx context.Context, accountId, clubId, id string) error
	CreateAccountClubSupporterSubscriptionOperator(ctx context.Context, accountClubSupp *AccountClubSupporterSubscription) error
	UpdateAccountClubSupporterSubscriptionStatusOperator(ctx context.Context, accountId, clubId, id string, updateFn func(subscription *AccountClubSupporterSubscription) error) (*AccountClubSupporterSubscription, error)
	UpdateAccountClubSupporterBillingDateOperator(ctx context.Context, accountId, clubId, id string, updateFn func(subscription *AccountClubSupporterSubscription) error) (*AccountClubSupporterSubscription, error)
	UpdateAccountClubSupporterPaymentMethodOperator(ctx context.Context, accountId, clubId, id string, updateFn func(subscription *AccountClubSupporterSubscription) error) (*AccountClubSupporterSubscription, error)
	HasExistingAccountClubSupporterSubscription(ctx context.Context, requester *principal.Principal, accountId, clubId string) (*AccountClubSupporterSubscription, error)
	HasExistingAccountClubSupporterSubscriptionOperator(ctx context.Context, accountId, clubId string) (*AccountClubSupporterSubscription, error)
	UpdateAccountClubSupporterCancel(ctx context.Context, requester *principal.Principal, accountId, clubId, id string, updateFn func(subscription *AccountClubSupporterSubscription) error) (*AccountClubSupporterSubscription, error)

	CreateAccountSavedPaymentMethodOperator(ctx context.Context, savedPaymentMethod *SavedPaymentMethod) error
	GetAccountSavedPaymentMethodByIdOperator(ctx context.Context, accountId, id string) (*SavedPaymentMethod, error)
	UpdateAccountSavedPaymentMethodOperator(ctx context.Context, accountId, id string, updateFn func(savedPaymentMethod *SavedPaymentMethod) error) (*SavedPaymentMethod, error)

	GetAccountTransactionHistoryById(ctx context.Context, requester *principal.Principal, transactionHistoryId string) (*AccountTransactionHistory, error)
	CreateAccountTransactionHistoryOperator(ctx context.Context, accountHistory *AccountTransactionHistory) error
	GetAccountTransactionHistoryByIdOperator(ctx context.Context, transactionHistoryId string) (*AccountTransactionHistory, error)

	GetCCBillSubscriptionDetailsByIdOperator(ctx context.Context, ccbillSubscriptionId string) (*CCBillSubscriptionDetails, error)
	CreateCCBillSubscriptionDetailsOperator(ctx context.Context, subscription *CCBillSubscriptionDetails) error
	UpdateCCBillSubscriptionDetailsPaymentMethodOperator(ctx context.Context, ccbillSubscriptionId string, updateFn func(subscription *CCBillSubscriptionDetails) error) (*CCBillSubscriptionDetails, error)
}

type FileRepository interface {
	GetClubSupporterReceiptFromAccountTransactionHistory(ctx context.Context, history *AccountTransactionHistory) (*ClubSupporterReceipt, error)
	CreateClubSupporterReceiptFromTransactionHistory(ctx context.Context, requester *principal.Principal, history *AccountTransactionHistory) (*ClubSupporterReceipt, error)
	UpdateClubSupporterReceiptWithNewFile(ctx context.Context, builder *ClubSupporterReceiptBuilder) error
}

type PricingRepository interface {
	GetClubSupporterPricingForLocation(ctx context.Context, location *location.Location, clubId string) (*Price, error)
	GetClubSupporterPricingForCurrency(ctx context.Context, currency Currency, clubId string) (*Price, error)
	GetClubSupporterAllPricing(ctx context.Context, clubId string) ([]*Price, error)
}