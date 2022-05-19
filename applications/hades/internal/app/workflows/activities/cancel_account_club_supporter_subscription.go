package activities

import (
	"context"
)

type CancelAccountClubSupporterSubscriptionInput struct {
	AccountClubSupporterSubscriptionId string
}

func (h *Activities) CancelAccountClubSupporterSubscription(ctx context.Context, input CancelAccountClubSupporterSubscriptionInput) error {

	subscription, err := h.billing.GetAccountClubSupporterSubscriptionByIdOperator(ctx, input.AccountClubSupporterSubscriptionId)

	if err != nil {
		return err
	}

	if err := h.ccbill.CancelSubscription(ctx, *subscription.CCBillSubscriptionId()); err != nil {
		return err
	}

	return nil
}
