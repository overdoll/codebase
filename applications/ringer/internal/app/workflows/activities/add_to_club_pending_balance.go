package activities

import (
	"context"
	"overdoll/libraries/money"
)

type AddToClubPendingBalanceInput struct {
	ClubId   string
	Amount   int64
	Currency money.Currency
}

func (h *Activities) AddToClubPendingBalance(ctx context.Context, input AddToClubPendingBalanceInput) error {
	return h.br.IncrementClubPendingBalance(ctx, input.ClubId, input.Amount, input.Currency)
}
