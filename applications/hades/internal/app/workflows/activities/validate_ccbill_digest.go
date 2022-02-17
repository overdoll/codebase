package activities

import (
	"context"
	"crypto/md5"
	"encoding/hex"
	"os"
)

type ValidateCCBillDigest struct {
	CCBillSubscriptionId           string
	DynamicPricingValidationDigest string
}

func (h *Activities) ValidateCCBillDigest(ctx context.Context, request ValidateCCBillDigest) (bool, error) {

	ccbillSubscriptionDigestBuilder := md5.New()
	ccbillSubscriptionDigestBuilder.Write([]byte(request.CCBillSubscriptionId))
	ccbillSubscriptionDigestBuilder.Write([]byte("1"))

	ccbillSubscriptionDigestBuilder.Write([]byte(os.Getenv("CCBILL_SALT_KEY")))

	digestToCompareAgainst := hex.EncodeToString(ccbillSubscriptionDigestBuilder.Sum(nil)[:])

	return digestToCompareAgainst == request.DynamicPricingValidationDigest, nil
}
