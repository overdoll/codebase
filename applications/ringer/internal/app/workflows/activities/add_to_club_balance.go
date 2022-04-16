package activities

import (
	"context"
	"overdoll/libraries/money"
)

type AddToClubBalanceInput struct {
	ClubId   string
	Amount   int64
	Currency money.Currency
}

func (h *Activities) AddToClubBalance(ctx context.Context, input AddToClubBalanceInput) error {
	return h.br.IncrementClubBalance(ctx, input.ClubId, input.Amount, input.Currency)
}
