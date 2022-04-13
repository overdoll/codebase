package activities

import (
	"context"
)

type MakeClubPaymentReadyForPayout struct {
	PaymentId string
}

func (h *Activities) MakeClubPaymentReadyForPayout(ctx context.Context, input MakeClubPaymentReadyForPayout) error {
	return nil
}
