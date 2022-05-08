package activities

import (
	"context"
)

type MakeClubPaymentsForPayoutCompleteInput struct {
	PayoutId string
}

func (h *Activities) MakeClubPaymentsForPayoutComplete(ctx context.Context, input MakeClubPaymentsForPayoutCompleteInput) error {

	pay, err := h.par.GetClubPayoutByIdOperator(ctx, input.PayoutId)

	if err != nil {
		return err
	}

	return h.pr.ScanClubPaymentsListForPayout(ctx, input.PayoutId, func(paymentIds []string) error {

		if err := h.pr.RemoveClubPaymentsFromClubReadyList(ctx, pay.ClubId(), paymentIds); err != nil {
			return err
		}

		// update the payment ids to be completed
		// and index the payments to be completed. Note that payments might be a large table so we don't actually grab the whole record,
		// only the ids, which should be enough for batch updates
		if err := h.pr.UpdateClubPaymentsCompleted(ctx, paymentIds); err != nil {
			return err
		}

		return nil
	})
}
