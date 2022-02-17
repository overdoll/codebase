package billing

import "context"

type Repository interface {
	GetAccountClubSupportSubscriptionById(ctx context.Context, accountId, clubId, id string) (*AccountClubSupportSubscription, error)
	GetAccountClubSupportSubscriptionByAccountAndClubId(ctx context.Context, accountId, clubId string) (*AccountClubSupportSubscription, error)
	CreateAccountClubSupportSubscription(ctx context.Context, accountClubSupp *AccountClubSupportSubscription) error

	CreateAccountSavedPaymentMethod(ctx context.Context, savedPaymentMethod *SavedPaymentMethod) error

	CreateAccountTransactionHistory(ctx context.Context, accountHistory *AccountTransactionHistory) error
}
