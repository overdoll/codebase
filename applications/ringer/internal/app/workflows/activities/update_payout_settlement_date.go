package activities

import (
	"context"
	"overdoll/applications/ringer/internal/domain/payout"
	"time"
)

type UpdatePayoutDepositDateInput struct {
	PayoutId    string
	DepositDate time.Time
}

func (h *Activities) UpdatePayoutDepositDate(ctx context.Context, input UpdatePayoutDepositDateInput) error {

	_, err := h.par.UpdatePayoutDepositDate(ctx, input.PayoutId, func(pay *payout.ClubPayout) error {
		return pay.UpdateDepositDate(input.DepositDate)
	})

	if err != nil {
		return err
	}

	return nil
}
