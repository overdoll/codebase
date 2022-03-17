package activities

import (
	"context"
)

type SendAccountClubSupporterSubscriptionCancellationNotificationInput struct {
	AccountClubSupporterSubscriptionId string
}

func (h *Activities) SendAccountClubSupporterSubscriptionCancellationNotification(ctx context.Context, input SendAccountClubSupporterSubscriptionSuccessNotificationInput) error {

	subscription, err := h.billing.GetAccountClubSupporterSubscriptionByIdOperator(ctx, input.AccountClubSupporterSubscriptionId)

	if err != nil {
		return err
	}

	if err := h.carrier.ClubSupporterSubscriptionCancelled(ctx, subscription); err != nil {
		return err
	}

	return nil
}
