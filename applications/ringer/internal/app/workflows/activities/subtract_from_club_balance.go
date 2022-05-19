package activities

import (
	"context"
	"overdoll/applications/ringer/internal/domain/balance"
	"overdoll/libraries/money"
)

type SubtractFromBalanceInput struct {
	ClubId   string
	Amount   uint64
	Currency money.Currency
}

func (h *Activities) SubtractFromClubBalance(ctx context.Context, input SubtractFromBalanceInput) error {
	return h.br.UpdateClubBalance(ctx, input.ClubId, func(balance *balance.ClubBalance) error {
		return balance.Deduct(input.Amount, input.Currency)
	})
}
