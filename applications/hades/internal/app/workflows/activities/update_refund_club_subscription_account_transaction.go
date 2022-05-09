package activities

import (
	"context"
	"overdoll/applications/hades/internal/domain/billing"
	"overdoll/libraries/money"
	"time"
)

type UpdateRefundClubSubscriptionAccountTransactionInput struct {
	TransactionId string
	Id            string

	Timestamp time.Time

	Currency string
	Amount   int64
	Reason   string
}

func (h *Activities) UpdateRefundClubSubscriptionAccountTransaction(ctx context.Context, input UpdateRefundClubSubscriptionAccountTransactionInput) error {

	cr, err := money.CurrencyFromString(input.Currency)

	if err != nil {
		return err
	}

	_, err = h.billing.UpdateAccountTransactionOperator(ctx, input.TransactionId, func(transaction *billing.AccountTransaction) error {
		return transaction.MakeRefunded(input.Id, input.Timestamp, input.Amount, cr, input.Reason)
	})

	if err != nil {
		return err
	}

	return nil
}
