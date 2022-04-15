package activities

import (
	"context"
	"overdoll/applications/ringer/internal/domain/payout"
	"time"
)

type AddFailureToPayoutInput struct {
	PayoutId  string
	Error     string
	Timestamp time.Time
}

func (h *Activities) AddFailureToPayout(ctx context.Context, input AddFailureToPayoutInput) error {

	_, err := h.par.UpdatePayoutState(ctx, input.PayoutId, func(pay *payout.ClubPayout) error {
		return pay.AddErrorEvent(input.Error, input.Timestamp)
	})

	if err != nil {
		return err
	}

	return nil
}
