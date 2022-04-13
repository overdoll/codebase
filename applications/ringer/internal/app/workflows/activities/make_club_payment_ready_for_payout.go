package activities

import (
	"context"
	"overdoll/applications/ringer/internal/domain/payment"
)

type MakeClubPaymentReadyForPayout struct {
	PaymentId string
}

func (h *Activities) MakeClubPaymentReadyForPayout(ctx context.Context, input MakeClubPaymentReadyForPayout) error {

	_, err := h.pr.UpdateClubPaymentStatus(ctx, input.PaymentId, func(pay *payment.Payment) error {
		return pay.MakeReady()
	})

	if err != nil {
		return err
	}

	return nil
}
