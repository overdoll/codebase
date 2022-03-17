package command

import (
	"context"
	"overdoll/applications/hades/internal/domain/billing"
	"overdoll/libraries/location"
	"time"
)

type StellaService interface {
	CanAccountBecomeClubSupporter(ctx context.Context, clubId, accountId string) (bool, error)
	AddClubSupporter(ctx context.Context, clubId, accountId string, supportedAt time.Time) error
	RemoveClubSupporter(ctx context.Context, clubId, accountId string) error
}

type EvaService interface {
	LocationFromIp(ctx context.Context, ip string) (*location.Location, error)
}

type CarrierService interface {
	UpcomingClubSupporterSubscriptionRenewals(ctx context.Context, accountId string, subscriptions []*billing.AccountClubSupporterSubscription) error
	ClubSupporterSubscriptionPaymentFailure(ctx context.Context, subscription *billing.AccountClubSupporterSubscription) error
	ClubSupporterSubscriptionRefunded(ctx context.Context, subscription *billing.AccountClubSupporterSubscription, transaction *billing.AccountTransaction, amount int64, currency string) error
	ClubSupporterSubscriptionCancelled(ctx context.Context, subscription *billing.AccountClubSupporterSubscription) error
	NewClubSupporterSubscription(ctx context.Context, subscription *billing.AccountClubSupporterSubscription) error
}
