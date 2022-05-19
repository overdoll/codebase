package activities

import (
	"context"
	"overdoll/applications/ringer/internal/domain/balance"
	"overdoll/libraries/money"
)

type SubtractFromClubPendingBalanceInput struct {
	PaymentId string
	ClubId    string
	Amount    uint64
	Currency  money.Currency
}

func (h *Activities) SubtractFromClubPendingBalance(ctx context.Context, input SubtractFromClubPendingBalanceInput) error {
	return h.br.UpdateClubPendingBalance(ctx, input.ClubId, func(balance *balance.ClubBalance) error {
		return balance.Deduct(input.Amount, input.Currency)
	})
}
