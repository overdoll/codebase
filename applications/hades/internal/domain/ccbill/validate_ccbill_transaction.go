package ccbill

import (
	"crypto/md5"
	"encoding/hex"
	"os"
)

func validateCCBillTransaction(hash, id string, val string) bool {
	ccbillSubscriptionDigestBuilder := md5.New()
	ccbillSubscriptionDigestBuilder.Write([]byte(id))
	ccbillSubscriptionDigestBuilder.Write([]byte(val))

	ccbillSubscriptionDigestBuilder.Write([]byte(os.Getenv("CCBILL_SALT_KEY")))

	digestToCompareAgainst := hex.EncodeToString(ccbillSubscriptionDigestBuilder.Sum(nil)[:])

	return digestToCompareAgainst == hash
}

func validateCCBillTransactionAuthorized(responseDigest string, ccbillSubscriptionId string) bool {
	return validateCCBillTransaction(responseDigest, ccbillSubscriptionId, "1")
}

func validateCCBillTransactionDenied(responseDigest string, ccbillDenialId string) bool {
	return validateCCBillTransaction(responseDigest, ccbillDenialId, "0")
}
