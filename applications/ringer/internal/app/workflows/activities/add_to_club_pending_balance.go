package activities

import (
	"context"
	"overdoll/applications/ringer/internal/domain/balance"
	"overdoll/libraries/money"
)

type AddToClubPendingBalanceInput struct {
	ClubId   string
	Amount   uint64
	Currency money.Currency
}

func (h *Activities) AddToClubPendingBalance(ctx context.Context, input AddToClubPendingBalanceInput) error {
	return h.br.UpdateClubPendingBalance(ctx, input.ClubId, func(balance *balance.ClubBalance) error {
		return balance.Add(input.Amount, input.Currency)
	})
}
