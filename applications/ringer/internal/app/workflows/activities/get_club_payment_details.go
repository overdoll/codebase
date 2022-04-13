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

	pay, err := h.pr.GetClubPaymentById(ctx, id)

	if err != nil {
		return nil, err
	}

	return &GetClubPaymentDetailsPayload{
		FinalAmount:    pay.FinalAmount(),
		Currency:       pay.BaseCurrency(),
		SettlementDate: pay.SettlementDate(),
	}, nil
}
