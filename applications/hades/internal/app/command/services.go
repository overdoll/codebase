package command

import (
	"context"
	"overdoll/applications/hades/internal/domain/billing"
	"overdoll/applications/hades/internal/domain/club"
	"overdoll/libraries/location"
	"overdoll/libraries/money"
	"overdoll/libraries/principal"
	"time"
)

type StellaService interface {
	GetClubById(ctx context.Context, clubId string) (*club.Club, error)
	AddClubSupporter(ctx context.Context, clubId, accountId string, supportedAt time.Time) error
	RemoveClubSupporter(ctx context.Context, clubId, accountId string) error
	SuspendClub(ctx context.Context, clubId string, isChargebacks bool) error
	GetAccountClubPrincipalExtension(ctx context.Context, accountId string) (*principal.ClubExtension, error)
}

type RingerService interface {
	NewClubSupporterSubscriptionPaymentDeposit(ctx context.Context, accountId, clubId, transactionId string, timestamp time.Time, price *billing.Price) error
	NewClubSupporterSubscriptionPaymentDeduction(ctx context.Context, accountId, clubId, transactionId string, timestamp time.Time, price *billing.Price) error
}

type EvaService interface {
	LocationFromIp(ctx context.Context, ip string) (*location.Location, error)
}

type CarrierService interface {
	UpcomingClubSupporterSubscriptionRenewals(ctx context.Context, accountId string, subscriptions []*billing.AccountClubSupporterSubscription) error
	ClubSupporterSubscriptionPaymentFailure(ctx context.Context, subscription *billing.AccountClubSupporterSubscription) error
	ClubSupporterSubscriptionRefunded(ctx context.Context, subscription *billing.AccountClubSupporterSubscription, transaction *billing.AccountTransaction, amount uint64, currency money.Currency) error
	ClubSupporterSubscriptionCancelled(ctx context.Context, subscription *billing.AccountClubSupporterSubscription) error
	NewClubSupporterSubscription(ctx context.Context, subscription *billing.AccountClubSupporterSubscription) error
	ClubSupporterSubscriptionDuplicate(ctx context.Context, accountId string, clubId string, amount uint64, currency money.Currency) error
	ClubOverChargebackThreshold(ctx context.Context, clubId string, threshold float64) error
}
