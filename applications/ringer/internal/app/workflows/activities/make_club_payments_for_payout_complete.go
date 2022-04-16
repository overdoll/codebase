package activities

import (
	"context"
)

type MakeClubPaymentsForPayoutCompleteInput struct {
	PayoutId string
}

func (h *Activities) MakeClubPaymentsForPayoutComplete(ctx context.Context, input MakeClubPaymentsForPayoutCompleteInput) error {
	return h.pr.ScanClubPaymentsListForPayout(ctx, input.PayoutId, func(paymentIds []string) error {

		// update the payment ids to be completed
		if err := h.pr.UpdateClubPaymentsCompleted(ctx, paymentIds); err != nil {
			return err
		}

		// and index the payments to be completed. Note that payments might be a large table so we don't actually grab the whole record,
		// only the ids, which should be enough for batch updates
		return h.pi.UpdateIndexClubPaymentsCompleted(ctx, paymentIds)
	})
}
