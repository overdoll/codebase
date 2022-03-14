package activities

import (
	"context"
	"overdoll/applications/hades/internal/domain/billing"
	"time"
)

type UpdateChargebackClubSubscriptionAccountTransactionRecordInput struct {
	TransactionId string

	Timestamp time.Time

	Currency string
	Amount   int64
	Reason   string
}

func (h *Activities) UpdateChargebackClubSubscriptionAccountTransaction(ctx context.Context, input UpdateChargebackClubSubscriptionAccountTransactionRecordInput) error {

	cr, err := billing.CurrencyFromString(input.Currency)

	if err != nil {
		return err
	}

	transaction, err := h.billing.UpdateAccountTransactionOperator(ctx, input.TransactionId, func(transaction *billing.AccountTransaction) error {
		return transaction.MakeChargeback(input.Timestamp, input.Amount, cr)
	})

	if err != nil {
		return err
	}

	return h.bi.IndexAccountTransaction(ctx, transaction)
}
