package activities

import (
	"context"
	"overdoll/applications/ringer/internal/domain/payment"
)

type AppendClubPaymentsToPayoutInput struct {
	PayoutId   string
	PaymentIds []string
}

func (h *Activities) AppendClubPaymentsToPayout(ctx context.Context, input AppendClubPaymentsToPayoutInput) error {

	// first, update the payments and index them
	for _, paymentId := range input.PaymentIds {

		_, err := h.pr.UpdateClubPaymentPayoutId(ctx, paymentId, func(pay *payment.ClubPayment) error {
			return pay.AddPayoutId(input.PayoutId)
		})

		if err != nil {
			return err
		}

	}

	if err := h.pr.AddClubPaymentsToPayout(ctx, input.PayoutId, input.PaymentIds); err != nil {
		return err
	}

	return nil
}
