package activities

import (
	"context"
	"overdoll/applications/ringer/internal/domain/balance"
	"overdoll/libraries/money"
)

type AddToClubBalanceInput struct {
	ClubId   string
	Amount   uint64
	Currency money.Currency
}

func (h *Activities) AddToClubBalance(ctx context.Context, input AddToClubBalanceInput) error {
	return h.br.UpdateClubBalance(ctx, input.ClubId, func(balance *balance.ClubBalance) error {
		return balance.Add(input.Amount, input.Currency)
	})
}
