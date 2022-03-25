package ccbill

import (
	"crypto/md5"
	"encoding/hex"
	"os"
)

func CreateCCBillAuthorizedHash(ccbillSubscriptionId string) string {
	return doHash(ccbillSubscriptionId, "1")
}

func CreateCCBillDeniedHash(ccbillDenialId string) string {
	return doHash(ccbillDenialId, "0")
}

func doHash(id string, key string) string {
	ccbillSubscriptionDigestBuilder := md5.New()
	ccbillSubscriptionDigestBuilder.Write([]byte(id))
	ccbillSubscriptionDigestBuilder.Write([]byte(key))

	ccbillSubscriptionDigestBuilder.Write([]byte(os.Getenv("CCBILL_SALT_KEY")))

	return hex.EncodeToString(ccbillSubscriptionDigestBuilder.Sum(nil)[:])
}

func validateCCBillTransaction(hash, id string, val string) bool {
	return doHash(id, val) == hash
}

func validateCCBillTransactionAuthorized(responseDigest string, ccbillSubscriptionId string) bool {
	return validateCCBillTransaction(responseDigest, ccbillSubscriptionId, "1")
}

func validateCCBillTransactionDenied(responseDigest string, ccbillDenialId string) bool {
	return validateCCBillTransaction(responseDigest, ccbillDenialId, "0")
}
