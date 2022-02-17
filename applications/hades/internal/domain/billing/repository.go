package billing

import "context"

type Repository interface {
	GetAccountClubSupportSubscriptionById(ctx context.Context, accountId, clubId, id string) (*AccountClubSupportSubscription, error)
	GetAccountClubSupportSubscriptionByAccountAndClubId(ctx context.Context, accountId, clubId string) (*AccountClubSupportSubscription, error)
	DeleteAccountClubSupportSubscription(ctx context.Context, accountId, clubId, id string) error
	CreateAccountClubSupportSubscription(ctx context.Context, accountClubSupp *AccountClubSupportSubscription) error
	UpdateAccountClubSupportSubscriptionStatus(ctx context.Context, accountId, clubId, id string, updateFn func(subscription *AccountClubSupportSubscription) error) (*AccountClubSupportSubscription, error)
	UpdateAccountClubSupportBillingDate(ctx context.Context, accountId, clubId, id string, updateFn func(subscription *AccountClubSupportSubscription) error) (*AccountClubSupportSubscription, error)

	CreateAccountSavedPaymentMethod(ctx context.Context, savedPaymentMethod *SavedPaymentMethod) error

	CreateAccountTransactionHistory(ctx context.Context, accountHistory *AccountTransactionHistory) error

	GetCCBillSubscription(ctx context.Context, ccbillSubscriptionId string) (*CCBillSubscription, error)
	UpdateCCBillSubscription(ctx context.Context, subscription *CCBillSubscription) error
}
