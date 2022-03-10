package activities

import (
	"context"
	"overdoll/applications/hades/internal/domain/billing"
	"time"
)

type RemoveAccountClubSupportSubscriptionInput struct {
	CCBillSubscriptionId *string
	ExpiredAt            time.Time
}

func (h *Activities) RemoveAccountClubSupportSubscription(ctx context.Context, input RemoveAccountClubSupportSubscriptionInput) error {

	subscription, err := h.billing.GetAccountClubSupporterSubscriptionByIdOperator(ctx, *input.CCBillSubscriptionId)

	if err != nil {
		return err
	}

	// when removing the subscription, we first create an expired record
	expired, err := billing.NewExpiredAccountClubSupporterSubscriptionFromSubscription(subscription, input.ExpiredAt)

	if err != nil {
		return err
	}

	if err := h.billing.CreateExpiredAccountClubSupporterSubscriptionOperator(ctx, expired); err != nil {
		return err
	}

	return h.billing.DeleteAccountClubSupporterSubscriptionOperator(ctx, subscription)
}
