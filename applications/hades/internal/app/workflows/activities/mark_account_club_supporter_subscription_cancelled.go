package activities

import (
	"context"
	"overdoll/applications/hades/internal/domain/billing"
	"time"
)

type MarkAccountClubSupporterSubscriptionCancelledInput struct {
	AccountClubSupporterSubscriptionId string
	CancelledAt                        time.Time
}

func (h *Activities) MarkAccountClubSupporterSubscriptionCancelled(ctx context.Context, input MarkAccountClubSupporterSubscriptionCancelledInput) error {

	_, err := h.billing.UpdateAccountClubSupporterSubscriptionStatusOperator(ctx, input.AccountClubSupporterSubscriptionId, func(subscription *billing.AccountClubSupporterSubscription) error {
		return subscription.MarkCancelled(input.CancelledAt)
	})

	if err != nil {
		return err
	}

	return nil
}
