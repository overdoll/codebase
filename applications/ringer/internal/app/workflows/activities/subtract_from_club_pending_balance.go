package activities

import (
	"context"
	"overdoll/libraries/money"
)

type SubtractFromClubPendingBalanceInput struct {
	PaymentId string
	ClubId    string
	Amount    int64
	Currency  money.Currency
}

func (h *Activities) SubtractFromClubPendingBalance(ctx context.Context, input SubtractFromClubPendingBalanceInput) error {
	return h.pr.DecrementClubPendingBalance(ctx, input.ClubId, input.Amount, input.Currency)
}
