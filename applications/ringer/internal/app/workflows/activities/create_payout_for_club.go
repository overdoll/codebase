package activities

import (
	"context"
	"overdoll/applications/ringer/internal/domain/payout"
	"overdoll/libraries/money"
	"time"
)

type CreatePayoutForClubInput struct {
	DepositRequestId      string
	PayoutId              string
	ClubId                string
	Amount                int64
	Currency              money.Currency
	Timestamp             time.Time
	DepositDate           *time.Time
	AccountPayoutMethodId string
	TemporalWorkflowId    string
}

type CreatePayoutForClubPayload struct {
	DepositDate time.Time
}

func (h *Activities) CreatePayoutForClub(ctx context.Context, input CreatePayoutForClubInput) (*CreatePayoutForClubPayload, error) {

	accountMethod, err := h.par.GetAccountPayoutMethodByIdOperator(ctx, input.AccountPayoutMethodId)

	if err != nil {
		return nil, err
	}

	newPayout, err := payout.NewQueuedPayout(input.DepositRequestId, accountMethod, input.PayoutId, input.ClubId, input.TemporalWorkflowId, input.Amount, input.Currency, input.Timestamp, input.DepositDate)

	if err != nil {
		return nil, err
	}

	if err := h.par.CreateClubPayout(ctx, newPayout); err != nil {
		return nil, err
	}

	if err := h.pir.IndexClubPayout(ctx, newPayout); err != nil {
		return nil, err
	}

	return &CreatePayoutForClubPayload{DepositDate: newPayout.DepositDate()}, nil
}
