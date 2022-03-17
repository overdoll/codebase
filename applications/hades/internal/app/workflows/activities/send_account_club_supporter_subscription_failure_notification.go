package activities

import (
	"context"
)

type SendAccountClubSupporterSubscriptionFailureNotificationInput struct {
	AccountClubSupporterSubscriptionId string
}

func (h *Activities) SendAccountClubSupporterSubscriptionFailureNotification(ctx context.Context, input SendAccountClubSupporterSubscriptionFailureNotificationInput) error {

	subscription, err := h.billing.GetAccountClubSupporterSubscriptionByIdOperator(ctx, input.AccountClubSupporterSubscriptionId)

	if err != nil {
		return err
	}

	if err := h.carrier.ClubSupporterSubscriptionPaymentFailure(ctx, subscription); err != nil {
		return err
	}

	return nil
}
