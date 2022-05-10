package activities

import (
	"context"
	"overdoll/libraries/money"
)

type GetCCBillSubscriptionDetailsPayload struct {
	ClubId                             string
	AccountId                          string
	AccountClubSupporterSubscriptionId string
	Duplicate                          bool
	Currency                           money.Currency
	Amount                             uint64
}

func (h *Activities) GetCCBillSubscriptionDetails(ctx context.Context, ccbillSubscriptionId string) (*GetCCBillSubscriptionDetailsPayload, error) {

	details, err := h.billing.GetCCBillSubscriptionDetailsByIdOperator(ctx, ccbillSubscriptionId)

	if err != nil {
		return nil, err
	}

	return &GetCCBillSubscriptionDetailsPayload{
		ClubId:                             details.ClubId(),
		AccountId:                          details.AccountId(),
		Duplicate:                          details.Duplicate(),
		Currency:                           details.AccountingCurrency(),
		Amount:                             details.AccountingInitialPrice(),
		AccountClubSupporterSubscriptionId: details.CCBillSubscriptionId(),
	}, nil
}
