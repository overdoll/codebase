package activities

import (
	"context"
	"overdoll/applications/hades/internal/domain/billing"
	"overdoll/libraries/money"
	"time"
)

type UpdateChargebackClubSubscriptionAccountTransactionRecordInput struct {
	TransactionId string

	Id        string
	Timestamp time.Time

	Currency money.Currency
	Amount   uint64
	Reason   string
}

func (h *Activities) UpdateChargebackClubSubscriptionAccountTransaction(ctx context.Context, input UpdateChargebackClubSubscriptionAccountTransactionRecordInput) error {

	_, err := h.billing.UpdateAccountTransactionOperator(ctx, input.TransactionId, func(transaction *billing.AccountTransaction) error {
		return transaction.MakeChargeback(input.Id, input.Timestamp, input.Amount, input.Currency, input.Reason)
	})

	if err != nil {
		return err
	}

	return nil
}
