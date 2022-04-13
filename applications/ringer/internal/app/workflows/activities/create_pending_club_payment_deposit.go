package activities

import (
	"context"
	"overdoll/libraries/money"
	"time"
)

type CreatePendingClubPaymentDepositInput struct {
	Id string
}

type CreatePendingClubPaymentDepositPayload struct {
	FinalAmount    int64
	Currency       money.Currency
	SettlementDate time.Time
}

func (h *Activities) CreatePendingClubPaymentDeposit(ctx context.Context, input CreatePendingClubPaymentDepositInput) (*CreatePendingClubPaymentDepositPayload, error) {
	return nil, nil
}
