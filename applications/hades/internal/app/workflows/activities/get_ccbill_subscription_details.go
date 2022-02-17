package activities

import (
	"context"
)

type GetCCBillSubscriptionDetailsPayload struct {
	ClubId    string
	AccountId string
}

func (h *Activities) GetCCBillSubscriptionDetails(ctx context.Context, ccbillSubscriptionId string) (*GetCCBillSubscriptionDetailsPayload, error) {
	return nil, nil
}
