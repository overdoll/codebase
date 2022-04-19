package activities

import (
	"context"
	"overdoll/applications/ringer/internal/domain/payout"
)

type MarkClubPayoutFailedInput struct {
	PayoutId string
}

func (h *Activities) MarkClubPayoutFailed(ctx context.Context, input MarkClubPayoutFailedInput) error {

	pay, err := h.par.UpdateClubPayoutState(ctx, input.PayoutId, func(pay *payout.ClubPayout) error {
		return pay.MakeFailed()
	})

	if err != nil {
		return err
	}

	if err := h.pir.IndexClubPayout(ctx, pay); err != nil {
		return err
	}

	return nil
}
