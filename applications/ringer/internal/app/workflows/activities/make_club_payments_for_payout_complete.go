package activities

import (
	"context"
)

type MakeClubPaymentsForPayoutCompleteInput struct {
	PayoutId string
}

func (h *Activities) MakeClubPaymentsForPayoutComplete(ctx context.Context, input MakeClubPaymentsForPayoutCompleteInput) error {
	return h.pr.GetClubPaymentsForClubPayoutAndMarkAsCompleted(ctx, input.PayoutId)
}
