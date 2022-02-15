package billing

import (
	"crypto/md5"
	"encoding/hex"
	"os"
	stella "overdoll/applications/stella/proto"
	"overdoll/libraries/principal"
	"strconv"
)

const (
	// initial price
	ccbillInitialPrice = 6.99

	// initial period (days)
	ccbillInitialPeriod = 30

	// charge in USD
	ccbillCurrencyCode = 840

	// recurring price
	ccbillRecurringPrice = 6.99

	// recurring period (days)
	ccbillRecurringPeriod = 30

	// indefinite rebills
	ccbillNumRebills = 99
)

type CCBillClubSupporterPaymentLink struct {
	savePaymentDetails bool
	clubId             string
	accountId          string
}

func NewCCBillClubSupporterPaymentLink(requester *principal.Principal, clubId string, savePaymentDetails bool) (*CCBillClubSupporterPaymentLink, error) {
	return &CCBillClubSupporterPaymentLink{
		savePaymentDetails: savePaymentDetails,
		clubId:             clubId,
		accountId:          requester.AccountId(),
	}, nil
}

func (c *CCBillClubSupporterPaymentLink) ClubId() string {
	return c.clubId
}

func (c *CCBillClubSupporterPaymentLink) AccountId() string {
	return c.accountId
}

func (c *CCBillClubSupporterPaymentLink) GeneratePaymentLink() (string, error) {

	ccbillSubAccountNumber := os.Getenv("CCBILL_SUB_ACCOUNT_NUMBER")

	billInitialPrice := strconv.FormatFloat(ccbillInitialPrice, 'f', 2, 64)
	billInitialPeriod := strconv.Itoa(ccbillInitialPeriod)

	billRecurringPrice := strconv.FormatFloat(ccbillRecurringPrice, 'f', 2, 64)
	billRecurringPeriod := strconv.Itoa(ccbillRecurringPeriod)
	billNumberRebills := strconv.Itoa(ccbillNumRebills)

	billCurrencyCode := strconv.Itoa(ccbillCurrencyCode)

	ccbillFormDigestBuilder := md5.New()
	ccbillFormDigestBuilder.Write([]byte(billInitialPrice))
	ccbillFormDigestBuilder.Write([]byte(billInitialPeriod))

	ccbillFormDigestBuilder.Write([]byte(billRecurringPrice))
	ccbillFormDigestBuilder.Write([]byte(billRecurringPeriod))
	ccbillFormDigestBuilder.Write([]byte(billNumberRebills))

	ccbillFormDigestBuilder.Write([]byte(billCurrencyCode))

	ccbillFormDigestBuilder.Write([]byte(os.Getenv("CCBILL_FLEXFORMS_SALT_KEY")))

	ccbillFormDigest := hex.EncodeToString(ccbillFormDigestBuilder.Sum(nil)[:])

	paymentLink := &stella.CCBillPaymentLink{
		SavePaymentDetails: c.savePaymentDetails,
		CcbillClubSupporter: &stella.CCBillClubSupporter{
			AccountId: c.accountId,
			ClubId:    c.clubId,
		},
	}

	// create an encrypted ccbill payment link that will be passed to other services
	encrypted, err := encryptCCBillPaymentLink(paymentLink)

	if err != nil {
		return "", err
	}

	url := os.Getenv("CCBILL_FLEXFORMS_URL") + "?clientSubacc=" + ccbillSubAccountNumber +
		"&initialPrice=" + billInitialPrice +
		"&initialPeriod=" + billInitialPeriod +
		"&recurringPrice=" + billRecurringPrice +
		"&recurringPeriod=" + billRecurringPeriod +
		"&numRebills=" + billNumberRebills +
		"&currencyCode=" + billCurrencyCode +
		"&formDigest=" + ccbillFormDigest +
		"&overdollLocker=" + *encrypted

	return url, nil
}
