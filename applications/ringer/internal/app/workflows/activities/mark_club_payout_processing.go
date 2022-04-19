package activities

import (
	"context"
	"overdoll/applications/ringer/internal/domain/payout"
)

type MarkClubPayoutProcessingInput struct {
	PayoutId string
}

func (h *Activities) MarkClubPayoutProcessing(ctx context.Context, input MarkClubPayoutProcessingInput) error {

	pay, err := h.par.UpdateClubPayoutStatus(ctx, input.PayoutId, func(pay *payout.ClubPayout) error {
		return pay.MakeProcessing()
	})

	if err != nil {
		return err
	}

	if err := h.pir.IndexClubPayout(ctx, pay); err != nil {
		return err
	}

	return nil
}
