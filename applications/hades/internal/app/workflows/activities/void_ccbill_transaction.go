package activities

import (
	"context"
)

type VoidCCBillTransactionInput struct {
	CCBillTransactionId string
}

func (h *Activities) VoidCCBillTransaction(ctx context.Context, input VoidCCBillTransactionInput) error {
	return h.ccbill.VoidTransaction(ctx, input.CCBillTransactionId)
}
