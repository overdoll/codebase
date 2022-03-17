package activities

import (
	"context"
	"overdoll/applications/hades/internal/domain/billing"
	"time"
)

type MarkAccountClubSupporterSubscriptionReactivatedInput struct {
	AccountClubSupporterSubscriptionId string
	NextBillingDate                    time.Time
}

func (h *Activities) MarkAccountClubSupporterSubscriptionReactivated(ctx context.Context, input MarkAccountClubSupporterSubscriptionReactivatedInput) error {

	_, err := h.billing.UpdateAccountClubSupporterSubscriptionStatusOperator(ctx, input.AccountClubSupporterSubscriptionId, func(subscription *billing.AccountClubSupporterSubscription) error {
		return subscription.MakeReactivated(input.NextBillingDate)
	})

	if err != nil {
		return err
	}

	return nil
}
