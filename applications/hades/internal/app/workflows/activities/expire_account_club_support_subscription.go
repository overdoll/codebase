package activities

import (
	"context"
	"overdoll/applications/hades/internal/domain/billing"
	"time"
)

type ExpireAccountClubSupportSubscriptionInput struct {
	AccountClubSupporterSubscriptionId string
	ExpiredAt                          time.Time
}

func (h *Activities) ExpireAccountClubSupportSubscription(ctx context.Context, input ExpireAccountClubSupportSubscriptionInput) error {

	subscription, err := h.billing.UpdateAccountClubSupporterSubscriptionStatusOperator(ctx, input.AccountClubSupporterSubscriptionId, func(subscription *billing.AccountClubSupporterSubscription) error {
		return subscription.MarkExpired(input.ExpiredAt)
	})

	if err != nil {
		return err
	}

	// create an expired record
	expired, err := billing.NewExpiredAccountClubSupporterSubscriptionFromSubscription(subscription, input.ExpiredAt)

	if err != nil {
		return err
	}

	if err := h.billing.CreateExpiredAccountClubSupporterSubscriptionOperator(ctx, expired); err != nil {
		return err
	}

	return nil
}
