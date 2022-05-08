package activities

import (
	"context"
	"overdoll/applications/ringer/internal/domain/payout"
)

type MarkClubPayoutCancelledInput struct {
	PayoutId string
}

func (h *Activities) MarkClubPayoutCancelled(ctx context.Context, input MarkClubPayoutCancelledInput) error {

	_, err := h.par.UpdateClubPayoutStatus(ctx, input.PayoutId, func(pay *payout.ClubPayout) error {
		return pay.MakeCancelled()
	})

	if err != nil {
		return err
	}

	return nil
}
