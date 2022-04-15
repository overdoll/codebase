package activities

import (
	"context"
	"overdoll/applications/ringer/internal/domain/payout"
)

type MarkPayoutProcessingInput struct {
	PayoutId string
}

func (h *Activities) MarkPayoutProcessing(ctx context.Context, input MarkPayoutProcessingInput) error {

	_, err := h.par.UpdatePayoutState(ctx, input.PayoutId, func(pay *payout.ClubPayout) error {
		return pay.MakeProcessing()
	})

	if err != nil {
		return err
	}

	return nil
}
