package ccbill

import (
	"os"
	hades "overdoll/applications/hades/proto"
	"overdoll/libraries/errors/domainerror"
	"time"
)

var (
	ErrFlexFormsPaymentLinkExpired = domainerror.NewValidation("flexforms payment link expired")
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
	ccbillPricingDetails := c.paymentToken.CcbillPricingDetails

	return os.Getenv("CCBILL_FLEXFORMS_URL") +
		"?clientSubacc=" + os.Getenv("CCBILL_SUB_ACCOUNT_NUMBER") +
		"&email=" + ccbillFlexFormsDetails.Email +
		"&initialPrice=" + ccbillPricingDetails.InitialPrice +
		"&initialPeriod=" + ccbillPricingDetails.InitialPeriod +
		"&recurringPrice=" + ccbillPricingDetails.RecurringPrice +
		"&recurringPeriod=" + ccbillPricingDetails.RecurringPeriod +
		"&numRebills=" + ccbillPricingDetails.NumRebills +
		"&currencyCode=" + ccbillPricingDetails.CurrencyCode +
		"&formDigest=" + ccbillFlexFormsDetails.PricingDigest +
		"&overdollPaymentToken=" + c.encryptedString
}
