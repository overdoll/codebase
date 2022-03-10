package activities

import (
	"context"
	"overdoll/applications/hades/internal/domain/billing"
	"time"
)

type MarkAccountClubSupportReactivatedInput struct {
	AccountId            string
	ClubId               string
	CCBillSubscriptionId *string
	NextBillingDate      time.Time
}

func (h *Activities) MarkAccountClubSupportReactivated(ctx context.Context, input MarkAccountClubSupportReactivatedInput) error {

	_, err := h.billing.UpdateAccountClubSupporterSubscriptionStatusOperator(ctx, input.AccountId, input.ClubId, *input.CCBillSubscriptionId, func(subscription *billing.AccountClubSupporterSubscription) error {
		return subscription.MakeReactivated(input.NextBillingDate)
	})

	if err != nil {
		return err
	}

	return nil
}
