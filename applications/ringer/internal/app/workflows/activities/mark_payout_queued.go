package activities

import (
	"context"
	"overdoll/applications/ringer/internal/domain/payout"
)

type MarkPayoutQueuedInput struct {
	PayoutId string
}

func (h *Activities) MarkPayoutQueued(ctx context.Context, input MarkPayoutCancelledInput) error {

	_, err := h.par.UpdatePayoutState(ctx, input.PayoutId, func(pay *payout.ClubPayout) error {
		return pay.MakeQueued()
	})

	if err != nil {
		return err
	}

	return nil
}
