package activities

import (
	"context"
	"overdoll/libraries/money"
	"time"
)

type CreatePendingClubPaymentDeductionInput struct {
	Id string
}

type CreatePendingClubPaymentDeductionPayload struct {
	FinalAmount    int64
	Currency       money.Currency
	SettlementDate time.Time
}

func (h *Activities) CreatePendingClubPaymentDeduction(ctx context.Context, input CreatePendingClubPaymentDeductionInput) (*CreatePendingClubPaymentDeductionPayload, error) {
	return nil, nil
}
