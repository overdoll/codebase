package ccbill

import (
	"errors"
	"os"
	hades "overdoll/applications/hades/proto"
	"time"
)

var (
	ErrFlexFormsPaymentLinkExpired = errors.New("flexforms payment link expired")
)

type FlexFormsPaymentLink struct {
	paymentToken    *hades.CCBillPayment
	encryptedString string
}

func NewFlexFormsPaymentLinkFromEncryptedPaymentToken(paymentToken string) (*FlexFormsPaymentLink, error) {

	decrypted, err := DecryptCCBillPayment(paymentToken)

	if err != nil {
		return nil, err
	}

	timestamp := decrypted.HeaderConfiguration.CreatedAt.AsTime()

	// make sure we dont try to use an expired payment token
	if timestamp.Add(time.Minute * 5).After(time.Now()) {
		return nil, ErrFlexFormsPaymentLinkExpired
	}

	return &FlexFormsPaymentLink{
		paymentToken:    decrypted,
		encryptedString: paymentToken,
	}, nil
}

func (c *FlexFormsPaymentLink) GenerateFlexFormsPaymentUrl() string {

	ccbillFlexFormsDetails := c.paymentToken.CcbillFlexFormsDetails

	return os.Getenv("CCBILL_FLEXFORMS_URL") +
		"?clientSubacc=" + os.Getenv("CCBILL_SUB_ACCOUNT_NUMBER") +
		"&initialPrice=" + ccbillFlexFormsDetails.InitialPrice +
		"&initialPeriod=" + ccbillFlexFormsDetails.InitialPeriod +
		"&recurringPrice=" + ccbillFlexFormsDetails.RecurringPrice +
		"&recurringPeriod=" + ccbillFlexFormsDetails.RecurringPeriod +
		"&numRebills=" + ccbillFlexFormsDetails.NumRebills +
		"&currencyCode=" + ccbillFlexFormsDetails.CurrencyCode +
		"&formDigest=" + ccbillFlexFormsDetails.Digest +
		"&overdollPaymentToken=" + c.encryptedString
}
