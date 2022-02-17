package billing

import "context"

type Repository interface {
	GetAccountClubSupportSubscriptionById(ctx context.Context, accountId, clubId, id string) (*AccountClubSupportSubscription, error)
	GetFirstAccountClubSupportSubscriptionByAccountAndClubId(ctx context.Context, accountId, clubId string) (*AccountClubSupportSubscription, error)
	DeleteAccountClubSupportSubscription(ctx context.Context, accountId, clubId, id string) error
	CreateAccountClubSupportSubscription(ctx context.Context, accountClubSupp *AccountClubSupportSubscription) error
	UpdateAccountClubSupportSubscriptionStatus(ctx context.Context, accountId, clubId, id string, updateFn func(subscription *AccountClubSupportSubscription) error) (*AccountClubSupportSubscription, error)
	UpdateAccountClubSupportBillingDate(ctx context.Context, accountId, clubId, id string, updateFn func(subscription *AccountClubSupportSubscription) error) (*AccountClubSupportSubscription, error)
	UpdateAccountClubSupportPaymentMethod(ctx context.Context, accountId, clubId, id string, updateFn func(subscription *AccountClubSupportSubscription) error) (*AccountClubSupportSubscription, error)

	CreateAccountSavedPaymentMethod(ctx context.Context, savedPaymentMethod *SavedPaymentMethod) error
	GetAccountSavedPaymentMethodById(ctx context.Context, accountId, id string) (*SavedPaymentMethod, error)
	UpdateAccountSavedPaymentMethod(ctx context.Context, accountId, id string, updateFn func(savedPaymentMethod *SavedPaymentMethod) error) (*SavedPaymentMethod, error)

	CreateAccountTransactionHistory(ctx context.Context, accountHistory *AccountTransactionHistory) error

	GetCCBillSubscription(ctx context.Context, ccbillSubscriptionId string) (*CCBillSubscription, error)
	CreateCCBillSubscription(ctx context.Context, subscription *CCBillSubscription) error
	UpdateCCBillSubscriptionPaymentMethod(ctx context.Context, ccbillSubscriptionId string, updateFn func(subscription *CCBillSubscription) error) (*CCBillSubscription, error)
}
