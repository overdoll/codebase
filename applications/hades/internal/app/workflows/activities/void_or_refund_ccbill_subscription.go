package activities

import (
	"context"
	"overdoll/applications/hades/internal/domain/ccbill"
)

type VoidOrRefundCCBillSubscriptionInput struct {
	CCBillSubscriptionId string
}

func (h *Activities) VoidOrRefundCCBillSubscription(ctx context.Context, input VoidOrRefundCCBillSubscriptionInput) error {

	voidOrRefund, err := ccbill.NewVoidOrRefundWithoutAmount(input.CCBillSubscriptionId)

	if err != nil {
		return err
	}

	return h.ccbill.VoidOrRefundSubscription(ctx, voidOrRefund)
}
