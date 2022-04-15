package activities

import (
	"context"
	"overdoll/applications/ringer/internal/domain/payout"
)

type MarkPayoutFailedInput struct {
	PayoutId string
}

func (h *Activities) MarkPayoutFailed(ctx context.Context, input MarkPayoutFailedInput) error {

	_, err := h.par.UpdatePayoutState(ctx, input.PayoutId, func(pay *payout.ClubPayout) error {
		return pay.MakeFailed()
	})

	if err != nil {
		return err
	}

	return nil
}
