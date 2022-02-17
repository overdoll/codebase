package activities

import (
	"context"
)

type ValidateCCBillDigest struct {
	CCBillSubscriptionId           string
	DynamicPricingValidationDigest string
}

func (h *Activities) ValidateCCBillDigest(ctx context.Context, payload ValidateCCBillDigest) (bool, error) {

	return false, nil
}
