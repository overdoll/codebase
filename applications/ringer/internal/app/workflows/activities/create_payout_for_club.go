package activities

import (
	"context"
	"overdoll/applications/ringer/internal/domain/payout"
	"overdoll/libraries/money"
	"time"
)

type CreatePayoutForClubInput struct {
	PayoutId              string
	ClubId                string
	PaymentIds            []string
	TotalAmount           int64
	Currency              money.Currency
	Timestamp             time.Time
	AccountPayoutMethodId string
}

func (h *Activities) CreatePayoutForClub(ctx context.Context, input CreatePayoutForClubInput) error {

	newPayout, err := payout.NewQueuedPayout(input.AccountPayoutMethodId, input.PayoutId, input.ClubId, input.TotalAmount, input.Currency, input.Timestamp)

	if err != nil {
		return err
	}

	if err := h.par.CreateClubPayout(ctx, newPayout); err != nil {
		return err
	}

	return nil
}
