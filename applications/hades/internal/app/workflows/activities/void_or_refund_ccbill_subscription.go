package activities

import (
	"context"
	"overdoll/applications/hades/internal/domain/ccbill"
)

func (h *Activities) VoidOrRefundCCBillSubscription(ctx context.Context, ccbillSubscriptionId string) error {

	voidOrRefund, err := ccbill.NewVoidOrRefundWithoutAmount(ccbillSubscriptionId)

	if err != nil {
		return err
	}

	return h.ccbill.VoidOrRefundSubscription(ctx, voidOrRefund)
}
