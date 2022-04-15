package activities

import (
	"context"
	"overdoll/applications/ringer/internal/domain/payout"
	"overdoll/libraries/money"
)

type MarkPayoutDepositedInput struct {
	PayoutId string
}

type MarkPayoutDepositedPayload struct {
	Amount   int64
	Currency money.Currency
	ClubId   string
}

func (h *Activities) MarkPayoutDeposited(ctx context.Context, input MarkPayoutDepositedInput) (*MarkPayoutDepositedPayload, error) {

	pay, err := h.par.UpdatePayoutState(ctx, input.PayoutId, func(pay *payout.ClubPayout) error {
		return pay.MakeDeposited()
	})

	if err != nil {
		return nil, err
	}

	return &MarkPayoutDepositedPayload{
		Amount:   pay.Amount(),
		Currency: pay.Currency(),
		ClubId:   pay.ClubId(),
	}, nil
}
