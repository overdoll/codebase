package activities

import (
	"context"
	"overdoll/applications/ringer/internal/domain/payout"
)

type MarkPayoutDepositedInput struct {
	PayoutId string
}

func (h *Activities) MarkPayoutDeposited(ctx context.Context, input MarkPayoutDepositedInput) error {

	_, err := h.par.UpdatePayoutState(ctx, input.PayoutId, func(pay *payout.ClubPayout) error {
		return pay.MakeDeposited()
	})

	if err != nil {
		return err
	}

	return nil
}
