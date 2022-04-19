package activities

import (
	"context"
	"overdoll/applications/ringer/internal/domain/payout"
	"overdoll/libraries/money"
)

type AppendToDepositRequestInput struct {
	PayoutId  string
	DepositId string
	Currency  money.Currency
	Amount    int64
}

func (h *Activities) AppendToDepositRequest(ctx context.Context, input AppendToDepositRequestInput) error {

	_, err := h.par.UpdateDepositRequestAmount(ctx, input.DepositId, func(pay *payout.DepositRequest) error {
		return pay.AppendPayoutAndAmount(input.PayoutId, input.Amount, input.Currency)
	})

	if err != nil {
		return err
	}

	return nil
}
