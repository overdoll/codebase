package activities

import (
	"context"
	"overdoll/applications/ringer/internal/domain/payout"
)

type MarkClubPayoutQueuedInput struct {
	PayoutId string
}

func (h *Activities) MarkClubPayoutQueued(ctx context.Context, input MarkClubPayoutCancelledInput) error {

	pay, err := h.par.UpdateClubPayoutState(ctx, input.PayoutId, func(pay *payout.ClubPayout) error {
		return pay.MakeQueued()
	})

	if err != nil {
		return err
	}

	if err := h.pir.IndexClubPayout(ctx, pay); err != nil {
		return err
	}

	return nil
}
