package activities

import (
	"context"
	"overdoll/applications/ringer/internal/domain/payout"
	"time"
)

type AddFailureToClubPayoutInput struct {
	PayoutId  string
	Error     string
	Timestamp time.Time
}

func (h *Activities) AddFailureToClubPayout(ctx context.Context, input AddFailureToClubPayoutInput) error {

	_, err := h.par.UpdateClubPayoutEvents(ctx, input.PayoutId, func(pay *payout.ClubPayout) error {
		return pay.AddErrorEvent(input.Error, input.Timestamp)
	})

	if err != nil {
		return err
	}

	return nil
}
