package activities

import (
	"context"
	"overdoll/applications/ringer/internal/domain/payout"
)

type MarkClubPayoutQueuedInput struct {
	PayoutId   string
	WorkflowId string
}

func (h *Activities) MarkClubPayoutQueued(ctx context.Context, input MarkClubPayoutQueuedInput) error {

	pay, err := h.par.UpdateClubPayoutStatus(ctx, input.PayoutId, func(pay *payout.ClubPayout) error {
		return pay.MakeQueued(input.WorkflowId)
	})

	if err != nil {
		return err
	}

	if err := h.pir.IndexClubPayout(ctx, pay); err != nil {
		return err
	}

	return nil
}
