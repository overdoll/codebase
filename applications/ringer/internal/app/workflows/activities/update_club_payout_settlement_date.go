package activities

import (
	"context"
	"overdoll/applications/ringer/internal/domain/payout"
	"time"
)

type UpdateClubPayoutDepositDateInput struct {
	PayoutId    string
	DepositDate time.Time
}

func (h *Activities) UpdateClubPayoutDepositDate(ctx context.Context, input UpdateClubPayoutDepositDateInput) error {

	pay, err := h.par.UpdateClubPayoutDepositDate(ctx, input.PayoutId, func(pay *payout.ClubPayout) error {
		return pay.UpdateDepositDate(input.DepositDate)
	})

	if err != nil {
		return err
	}

	if err := h.pir.IndexClubPayout(ctx, pay); err != nil {
		return err
	}

	return nil
}
