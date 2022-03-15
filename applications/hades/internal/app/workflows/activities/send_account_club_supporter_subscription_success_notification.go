package activities

import (
	"context"
)

type SendAccountClubSupporterSubscriptionSuccessNotificationInput struct {
	AccountClubSupporterSubscriptionId string
}

func (h *Activities) SendAccountClubSupporterSubscriptionSuccessNotification(ctx context.Context, input SendAccountClubSupporterSubscriptionSuccessNotificationInput) error {

	subscription, err := h.billing.GetAccountClubSupporterSubscriptionByIdOperator(ctx, input.AccountClubSupporterSubscriptionId)

	if err != nil {
		return err
	}

	if err := h.carrier.NewClubSupporterSubscription(ctx, subscription); err != nil {
		return err
	}

	return nil
}
