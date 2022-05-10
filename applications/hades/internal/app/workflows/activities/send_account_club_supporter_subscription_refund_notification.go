package activities

import (
	"context"
	"overdoll/libraries/money"
)

type SendAccountClubSupporterSubscriptionRefundNotificationInput struct {
	AccountClubSupporterSubscriptionId string
	AccountTransactionId               string

	Currency money.Currency
	Amount   uint64
}

func (h *Activities) SendAccountClubSupporterSubscriptionRefundNotification(ctx context.Context, input SendAccountClubSupporterSubscriptionRefundNotificationInput) error {

	subscription, err := h.billing.GetAccountClubSupporterSubscriptionByIdOperator(ctx, input.AccountClubSupporterSubscriptionId)

	if err != nil {
		return err
	}

	transaction, err := h.billing.GetAccountTransactionByIdOperator(ctx, input.AccountTransactionId)

	if err != nil {
		return err
	}

	if err := h.carrier.ClubSupporterSubscriptionRefunded(ctx, subscription, transaction, input.Amount, input.Currency); err != nil {
		return err
	}

	return nil
}
