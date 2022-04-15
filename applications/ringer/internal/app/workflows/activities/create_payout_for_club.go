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
	DepositDate           *time.Time
	AccountPayoutMethodId string
}

type CreatePayoutForClubPayload struct {
	DepositDate time.Time
}

func (h *Activities) CreatePayoutForClub(ctx context.Context, input CreatePayoutForClubInput) (*CreatePayoutForClubPayload, error) {

	newPayout, err := payout.NewQueuedPayout(input.AccountPayoutMethodId, input.PayoutId, input.ClubId, input.TotalAmount, input.Currency, input.Timestamp, input.DepositDate)

	if err != nil {
		return nil, err
	}

	if err := h.par.CreateClubPayout(ctx, newPayout); err != nil {
		return nil, err
	}

	return &CreatePayoutForClubPayload{DepositDate: newPayout.DepositDate()}, nil
}
