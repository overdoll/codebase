package ccbill

import (
	"crypto/md5"
	"encoding/hex"
	"os"
	hades "overdoll/applications/hades/proto"
	"overdoll/libraries/principal"
	"strconv"
)

type FlexFormsClubSupporterPaymentLink struct {
	savePaymentDetails bool
	clubId             string
	accountId          string
}

func NewFlexFormsClubSupporterPaymentLink(requester *principal.Principal, clubId string, savePaymentDetails bool) (*FlexFormsClubSupporterPaymentLink, error) {
	return &FlexFormsClubSupporterPaymentLink{
		savePaymentDetails: savePaymentDetails,
		clubId:             clubId,
		accountId:          requester.AccountId(),
	}, nil
}

func (c *FlexFormsClubSupporterPaymentLink) ClubId() string {
	return c.clubId
}

func (c *FlexFormsClubSupporterPaymentLink) AccountId() string {
	return c.accountId
}

func (c *FlexFormsClubSupporterPaymentLink) GeneratePaymentLink() (string, error) {

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

	ccbillFormDigestBuilder.Write([]byte(os.Getenv("CCBILL_SALT_KEY")))

	ccbillFormDigest := hex.EncodeToString(ccbillFormDigestBuilder.Sum(nil)[:])

	paymentLink := &hades.CCBillPayment{
		HeaderConfiguration: &hades.HeaderConfiguration{SavePaymentDetails: c.savePaymentDetails},
		CcbillClubSupporter: &hades.CCBillClubSupporter{
			ClubId: c.clubId,
		},
		AccountInitiator: &hades.AccountInitiator{
			AccountId: c.accountId,
		},
	}

	// create an encrypted ccbill payment link that will be passed to other services
	encrypted, err := encryptCCBillPayment(paymentLink)

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
