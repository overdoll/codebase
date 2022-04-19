package activities

import (
	"context"
	"overdoll/libraries/money"
)

type AppendToDepositRequestInput struct {
	PayoutId  string
	DepositId string
	Currency  money.Currency
	Amount    int64
}

func (h *Activities) AppendToDepositRequest(ctx context.Context, input AppendToDepositRequestInput) error {
	return h.par.AppendPayoutToDepositRequest(ctx, input.DepositId, input.PayoutId)
}
