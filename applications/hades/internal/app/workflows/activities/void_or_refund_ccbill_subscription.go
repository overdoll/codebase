package activities

import (
	"context"
)

type VoidOrRefundCCBillSubscriptionInput struct {
	CCBillSubscriptionId string
}

func (h *Activities) VoidOrRefundCCBillSubscription(ctx context.Context, input VoidOrRefundCCBillSubscriptionInput) error {
	return h.ccbill.VoidOrRefundSubscription(ctx, input.CCBillSubscriptionId)
}
