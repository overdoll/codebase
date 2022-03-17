package activities

import (
	"context"
)

type VoidCCBillSubscriptionInput struct {
	CCBillSubscriptionId string
}

func (h *Activities) VoidCCBillSubscription(ctx context.Context, input VoidCCBillSubscriptionInput) error {
	return h.ccbill.VoidTransaction(ctx, input.CCBillSubscriptionId)
}
