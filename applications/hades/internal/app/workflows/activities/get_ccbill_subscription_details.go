package activities

import (
	"context"
)

type GetCCBillSubscriptionDetailsPayload struct {
	ClubId    string
	AccountId string
	Duplicate bool
	Currency  string
	Amount    int64
}

func (h *Activities) GetCCBillSubscriptionDetails(ctx context.Context, ccbillSubscriptionId string) (*GetCCBillSubscriptionDetailsPayload, error) {

	details, err := h.billing.GetCCBillSubscriptionDetailsByIdOperator(ctx, ccbillSubscriptionId)

	if err != nil {
		return nil, err
	}

	return &GetCCBillSubscriptionDetailsPayload{
		ClubId:    details.ClubId(),
		AccountId: details.AccountId(),
		Duplicate: details.Duplicate(),
		Currency:  details.AccountingCurrency().String(),
		Amount:    details.AccountingInitialPrice(),
	}, nil
}
