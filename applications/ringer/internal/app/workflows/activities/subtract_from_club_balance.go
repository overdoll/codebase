package activities

import (
	"context"
	"overdoll/libraries/money"
)

type SubtractFromBalanceInput struct {
	ClubId   string
	Amount   int64
	Currency money.Currency
}

func (h *Activities) SubtractFromClubBalance(ctx context.Context, input SubtractFromBalanceInput) error {
	return h.br.DecrementClubBalance(ctx, input.ClubId, input.Amount, input.Currency)
}
