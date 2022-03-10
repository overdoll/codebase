package activities

import (
	"context"
	"overdoll/applications/hades/internal/domain/billing"
	"time"
)

type MarkAccountClubSupportCancelledInput struct {
	AccountId            string
	ClubId               string
	CCBillSubscriptionId *string
	CancelledAt          time.Time
}

func (h *Activities) MarkAccountClubSupportCancelled(ctx context.Context, input MarkAccountClubSupportCancelledInput) error {

	_, err := h.billing.UpdateAccountClubSupporterSubscriptionStatusOperator(ctx, input.AccountId, input.ClubId, *input.CCBillSubscriptionId, func(subscription *billing.AccountClubSupporterSubscription) error {
		return subscription.MarkCancelled(input.CancelledAt)
	})

	if err != nil {
		return err
	}

	return nil
}
