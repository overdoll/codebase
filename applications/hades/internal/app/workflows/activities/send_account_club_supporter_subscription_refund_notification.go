package activities

import (
	"context"
)

type SendAccountClubSupporterSubscriptionRefundNotificationInput struct {
	SubscriptionId string
	TransactionId  string

	Currency string
	Amount   int64
}

func (h *Activities) SendAccountClubSupporterSubscriptionRefundNotification(ctx context.Context, input SendAccountClubSupporterSubscriptionRefundNotificationInput) error {

	subscription, err := h.billing.GetAccountClubSupporterSubscriptionByIdOperator(ctx, input.SubscriptionId)

	if err != nil {
		return err
	}

	transaction, err := h.billing.GetAccountTransactionByIdOperator(ctx, input.TransactionId)

	if err != nil {
		return err
	}

	if err := h.carrier.ClubSupporterSubscriptionRefunded(ctx, subscription, transaction, input.Amount, input.Currency); err != nil {
		return err
	}

	return nil
}
