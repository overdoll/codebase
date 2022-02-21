package billing

import (
	"context"
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

	GetAccountClubSupporterSubscriptionByIdOperator(ctx context.Context, accountId, clubId, id string) (*AccountClubSupporterSubscription, error)
	DeleteAccountClubSupporterSubscriptionOperator(ctx context.Context, accountId, clubId, id string) error
	CreateAccountClubSupporterSubscriptionOperator(ctx context.Context, accountClubSupp *AccountClubSupporterSubscription) error
	UpdateAccountClubSupporterSubscriptionStatusOperator(ctx context.Context, accountId, clubId, id string, updateFn func(subscription *AccountClubSupporterSubscription) error) (*AccountClubSupporterSubscription, error)
	UpdateAccountClubSupporterBillingDateOperator(ctx context.Context, accountId, clubId, id string, updateFn func(subscription *AccountClubSupporterSubscription) error) (*AccountClubSupporterSubscription, error)
	UpdateAccountClubSupporterPaymentMethodOperator(ctx context.Context, accountId, clubId, id string, updateFn func(subscription *AccountClubSupporterSubscription) error) (*AccountClubSupporterSubscription, error)
	HasExistingAccountClubSupporterSubscriptionOperator(ctx context.Context, accountId, clubId string) (*AccountClubSupporterSubscription, error)

	CreateAccountSavedPaymentMethodOperator(ctx context.Context, savedPaymentMethod *SavedPaymentMethod) error
	GetAccountSavedPaymentMethodByIdOperator(ctx context.Context, accountId, id string) (*SavedPaymentMethod, error)
	UpdateAccountSavedPaymentMethodOperator(ctx context.Context, accountId, id string, updateFn func(savedPaymentMethod *SavedPaymentMethod) error) (*SavedPaymentMethod, error)

	CreateAccountTransactionHistoryOperator(ctx context.Context, accountHistory *AccountTransactionHistory) error

	GetCCBillSubscriptionDetailsByIdOperator(ctx context.Context, ccbillSubscriptionId string) (*CCBillSubscriptionDetails, error)
	CreateCCBillSubscriptionDetailsOperator(ctx context.Context, subscription *CCBillSubscriptionDetails) error
	UpdateCCBillSubscriptionDetailsPaymentMethodOperator(ctx context.Context, ccbillSubscriptionId string, updateFn func(subscription *CCBillSubscriptionDetails) error) (*CCBillSubscriptionDetails, error)
}
