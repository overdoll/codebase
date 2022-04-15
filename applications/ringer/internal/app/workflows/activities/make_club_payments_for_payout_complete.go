package activities

import (
	"context"
)

type MakeClubPaymentsForPayoutCompleteInput struct {
	PayoutId string
}

func (h *Activities) MakeClubPaymentsForPayoutComplete(ctx context.Context, input MakeClubPaymentsForPayoutCompleteInput) error {

	// delete all payments from the "ready" list from this payout
	// mark all payment IDs as "complete"

	return nil
}
