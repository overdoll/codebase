package activities

import (
	"context"
	"overdoll/libraries/money"
)

type AddToClubPendingBalanceInput struct {
	PaymentId string
	ClubId    string
	Amount    int64
	Currency  money.Currency
}

func (h *Activities) AddToClubPendingBalance(ctx context.Context, input AddToClubPendingBalanceInput) error {
	return h.pr.IncrementClubPendingBalance(ctx, input.ClubId, input.Amount, input.Currency)
}
