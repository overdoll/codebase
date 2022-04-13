package activities

import (
	"context"
	"overdoll/libraries/money"
)

type AddToClubBalanceInput struct {
	PaymentId string
	ClubId    string
	Amount    int64
	Currency  money.Currency
}

func (h *Activities) AddToClubBalance(ctx context.Context, input AddToClubBalanceInput) error {
	return h.pr.IncrementClubBalance(ctx, input.ClubId, input.Amount, input.Currency)
}
