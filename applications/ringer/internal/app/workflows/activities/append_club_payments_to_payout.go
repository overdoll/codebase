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

	for _, paymentId := range input.PaymentIds {

		pay, err := h.pr.UpdateClubPaymentPayoutId(ctx, paymentId, func(pay *payment.ClubPayment) error {
			return pay.AddPayoutId(input.PayoutId)
		})

		if err != nil {
			return err
		}

		if err := h.pi.IndexClubPayment(ctx, pay); err != nil {
			return err
		}
	}

	return nil
}
