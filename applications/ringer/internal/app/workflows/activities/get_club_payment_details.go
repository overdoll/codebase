package activities

import (
	"context"
	"overdoll/libraries/money"
	"time"
)

type GetClubPaymentDetailsPayload struct {
	FinalAmount    int64
	Currency       money.Currency
	SettlementDate time.Time
}

func (h *Activities) GetClubPaymentDetails(ctx context.Context, id string) (*GetClubPaymentDetailsPayload, error) {
	return nil, nil
}
