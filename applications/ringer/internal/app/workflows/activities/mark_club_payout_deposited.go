package activities

import (
	"context"
	"overdoll/applications/ringer/internal/domain/payout"
	"overdoll/libraries/money"
)

type MarkClubPayoutDepositedInput struct {
	PayoutId string
}

type MarkClubPayoutDepositedPayload struct {
	Amount   uint64
	Currency money.Currency
	ClubId   string
}

func (h *Activities) MarkClubPayoutDeposited(ctx context.Context, input MarkClubPayoutDepositedInput) (*MarkClubPayoutDepositedPayload, error) {

	pay, err := h.par.UpdateClubPayoutStatus(ctx, input.PayoutId, func(pay *payout.ClubPayout) error {
		return pay.MakeDeposited()
	})

	if err != nil {
		return nil, err
	}

	return &MarkClubPayoutDepositedPayload{
		Amount:   pay.Amount(),
		Currency: pay.Currency(),
		ClubId:   pay.ClubId(),
	}, nil
}
