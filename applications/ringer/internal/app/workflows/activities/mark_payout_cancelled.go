package activities

import (
	"context"
	"overdoll/applications/ringer/internal/domain/payout"
)

type MarkPayoutCancelledInput struct {
	PayoutId string
}

func (h *Activities) MarkPayoutCancelled(ctx context.Context, input MarkPayoutCancelledInput) error {

	_, err := h.par.UpdatePayoutState(ctx, input.PayoutId, func(pay *payout.ClubPayout) error {
		return pay.MakeFailed()
	})

	if err != nil {
		return err
	}

	return nil
}
