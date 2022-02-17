package activities

import "context"

func (h *Activities) VoidOrRefundCCBillSubscription(ctx context.Context, ccbillSubscriptionId string) error {
	return h.ccbill.VoidOrRefundCCBillSubscription(ctx, ccbillSubscriptionId)
}
