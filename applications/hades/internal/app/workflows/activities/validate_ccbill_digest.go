package activities

import (
	"context"
	"overdoll/applications/hades/internal/domain/ccbill"
)

type ValidateCCBillDigest struct {
	CCBillSubscriptionId           string
	DynamicPricingValidationDigest string
}

func (h *Activities) ValidateCCBillDigest(ctx context.Context, request ValidateCCBillDigest) (bool, error) {
	return ccbill.ValidateCCBillTransactionAuthorized(request.DynamicPricingValidationDigest, request.CCBillSubscriptionId), nil
}
