package billing

import (
	"context"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
)

type Repository interface {
	GetAccountClubSupporterSubscriptions(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, accountId string) ([]*AccountClubSupporterSubscription, error)

	GetAccountClubSupporterSubscriptionById(ctx context.Context, requester *principal.Principal, accountId, clubId, id string) (*AccountClubSupporterSubscription, error)
	GetAccountClubSupporterSubscriptionByIdOperator(ctx context.Context, accountId, clubId, id string) (*AccountClubSupporterSubscription, error)
	DeleteAccountClubSupporterSubscription(ctx context.Context, accountId, clubId, id string) error
	CreateAccountClubSupporterSubscription(ctx context.Context, accountClubSupp *AccountClubSupporterSubscription) error
	UpdateAccountClubSupporterSubscriptionStatus(ctx context.Context, accountId, clubId, id string, updateFn func(subscription *AccountClubSupporterSubscription) error) (*AccountClubSupporterSubscription, error)
	UpdateAccountClubSupporterBillingDate(ctx context.Context, accountId, clubId, id string, updateFn func(subscription *AccountClubSupporterSubscription) error) (*AccountClubSupporterSubscription, error)
	UpdateAccountClubSupporterPaymentMethod(ctx context.Context, accountId, clubId, id string, updateFn func(subscription *AccountClubSupporterSubscription) error) (*AccountClubSupporterSubscription, error)
	HasExistingAccountClubSupporterSubscription(ctx context.Context, accountId, clubId string) (bool, error)

	CreateAccountSavedPaymentMethod(ctx context.Context, savedPaymentMethod *SavedPaymentMethod) error
	GetAccountSavedPaymentMethods(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, accountId string) ([]*SavedPaymentMethod, error)
	GetAccountSavedPaymentMethodById(ctx context.Context, accountId, id string) (*SavedPaymentMethod, error)
	UpdateAccountSavedPaymentMethod(ctx context.Context, accountId, id string, updateFn func(savedPaymentMethod *SavedPaymentMethod) error) (*SavedPaymentMethod, error)
	DeleteAccountSavedPaymentMethod(ctx context.Context, requester *principal.Principal, accountId, id string) error

	CreateAccountTransactionHistory(ctx context.Context, accountHistory *AccountTransactionHistory) error
	SearchAccountTransactionHistory(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, filters *AccountTransactionHistoryFilters) ([]*AccountTransactionHistory, error)

	GetCCBillSubscriptionDetailsById(ctx context.Context, requester *principal.Principal, ccbillSubscriptionId string) (*CCBillSubscriptionDetails, error)
	GetCCBillSubscriptionDetailsByIdOperator(ctx context.Context, ccbillSubscriptionId string) (*CCBillSubscriptionDetails, error)
	CreateCCBillSubscriptionDetails(ctx context.Context, subscription *CCBillSubscriptionDetails) error
	UpdateCCBillSubscriptionDetailsPaymentMethod(ctx context.Context, ccbillSubscriptionId string, updateFn func(subscription *CCBillSubscriptionDetails) error) (*CCBillSubscriptionDetails, error)
}
