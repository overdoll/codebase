package activities

import (
	"context"
	"overdoll/applications/hades/internal/domain/billing"
	"time"
)

type UpdateAccountClubSupporterBillingDateInput struct {
	AccountClubSupporterSubscriptionId string
	NextBillingDate                    time.Time
}

func (h *Activities) UpdateAccountClubSupporterBillingDate(ctx context.Context, input UpdateAccountClubSupporterBillingDateInput) error {

	_, err := h.billing.UpdateAccountClubSupporterBillingDateOperator(ctx, input.AccountClubSupporterSubscriptionId, func(subscription *billing.AccountClubSupporterSubscription) error {
		return subscription.UpdateBillingDate(input.NextBillingDate)
	})

	if err != nil {
		return err
	}

	return nil
}
