package activities

import (
	"context"
	"overdoll/applications/ringer/internal/domain/payout"
)

type MarkClubPayoutCancelledInput struct {
	PayoutId string
}

func (h *Activities) MarkClubPayoutCancelled(ctx context.Context, input MarkClubPayoutCancelledInput) error {

	pay, err := h.par.UpdateClubPayoutStatus(ctx, input.PayoutId, func(pay *payout.ClubPayout) error {
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
