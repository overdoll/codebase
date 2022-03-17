package activities

import (
	"context"
	"overdoll/applications/hades/internal/domain/billing"
	"time"
)

type UpdateAccountClubSupportBillingDateInput struct {
	AccountClubSupporterSubscriptionId string
	NextBillingDate                    time.Time
}

func (h *Activities) UpdateAccountClubSupportBillingDate(ctx context.Context, input UpdateAccountClubSupportBillingDateInput) error {

	_, err := h.billing.UpdateAccountClubSupporterBillingDateOperator(ctx, input.AccountClubSupporterSubscriptionId, func(subscription *billing.AccountClubSupporterSubscription) error {
		return subscription.UpdateBillingDate(input.NextBillingDate)
	})

	if err != nil {
		return err
	}

	return nil
}
