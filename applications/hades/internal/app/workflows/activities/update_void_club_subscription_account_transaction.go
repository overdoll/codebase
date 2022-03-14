package activities

import (
	"context"
	"overdoll/applications/hades/internal/domain/billing"
	"time"
)

type UpdateVoidClubSubscriptionAccountTransactionInput struct {
	TransactionId string
	Timestamp     time.Time
	Reason        string
}

func (h *Activities) UpdateVoidClubSubscriptionAccountTransaction(ctx context.Context, input UpdateRefundClubSubscriptionAccountTransactionInput) error {

	transaction, err := h.billing.UpdateAccountTransactionOperator(ctx, input.TransactionId, func(transaction *billing.AccountTransaction) error {
		return transaction.MakeVoid(input.Timestamp)
	})

	if err != nil {
		return err
	}

	return h.bi.IndexAccountTransaction(ctx, transaction)
}
