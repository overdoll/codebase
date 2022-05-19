package activities

import (
	"context"
	"overdoll/applications/hades/internal/domain/billing"
	"time"
)

type UpdateVoidClubSubscriptionAccountTransactionInput struct {
	AccountTransactionId string
	Timestamp            time.Time
	Reason               string
}

func (h *Activities) UpdateVoidClubSubscriptionAccountTransaction(ctx context.Context, input UpdateRefundClubSubscriptionAccountTransactionInput) error {

	_, err := h.billing.UpdateAccountTransactionOperator(ctx, input.AccountTransactionId, func(transaction *billing.AccountTransaction) error {
		return transaction.MakeVoid(input.Timestamp, input.Reason)
	})

	if err != nil {
		return err
	}

	return nil
}
