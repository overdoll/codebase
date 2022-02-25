package ccbill

import (
	"crypto/md5"
	"encoding/hex"
	"os"
	"overdoll/applications/hades/internal/domain/billing"
	hades "overdoll/applications/hades/proto"
	"overdoll/libraries/principal"
	"strconv"
)

type ClubSupporterPaymentLink struct {
	savePaymentDetails bool
	clubId             string
	accountId          string

	amount   float64
	currency int
}

func NewClubSupporterPaymentLink(requester *principal.Principal, clubId string, savePaymentDetails bool, price *billing.Price) (*ClubSupporterPaymentLink, error) {
	return &ClubSupporterPaymentLink{
		savePaymentDetails: savePaymentDetails,
		clubId:             clubId,
		accountId:          requester.AccountId(),
		amount:             price.Amount(),
		currency:           currencyStringToCCBillCode[price.Currency().String()],
	}, nil
}

func (c *ClubSupporterPaymentLink) ClubId() string {
	return c.clubId
}

func (c *ClubSupporterPaymentLink) AccountId() string {
	return c.accountId
}

func (c *ClubSupporterPaymentLink) GenerateLink() (*string, error) {

	encryptedToken, err := c.generateEncryptedPaymentToken()

	if err != nil {
		return nil, err
	}

	url := os.Getenv("APP_URL") + "/api/ccbill/payment-flow?token=" + *encryptedToken

	return &url, nil
}

// GenerateEncryptedPaymentToken - basically lock down the price at generation time
func (c *ClubSupporterPaymentLink) generateEncryptedPaymentToken() (*string, error) {

	billInitialPrice := strconv.FormatFloat(c.amount, 'f', 2, 64)
	billInitialPeriod := strconv.Itoa(ccbillInitialPeriod)

	billRecurringPrice := strconv.FormatFloat(c.amount, 'f', 2, 64)
	billRecurringPeriod := strconv.Itoa(ccbillRecurringPeriod)
	billNumberRebills := strconv.Itoa(ccbillNumRebills)

	billCurrencyCode := strconv.Itoa(c.currency)

	ccbillFormDigestBuilder := md5.New()
	ccbillFormDigestBuilder.Write([]byte(billInitialPrice))
	ccbillFormDigestBuilder.Write([]byte(billInitialPeriod))

	ccbillFormDigestBuilder.Write([]byte(billRecurringPrice))
	ccbillFormDigestBuilder.Write([]byte(billRecurringPeriod))
	ccbillFormDigestBuilder.Write([]byte(billNumberRebills))

	ccbillFormDigestBuilder.Write([]byte(billCurrencyCode))

	ccbillFormDigestBuilder.Write([]byte(os.Getenv("CCBILL_SALT_KEY")))

	ccbillFormDigest := hex.EncodeToString(ccbillFormDigestBuilder.Sum(nil)[:])

	paymentToken := &hades.CCBillPayment{
		HeaderConfiguration: &hades.HeaderConfiguration{SavePaymentDetails: c.savePaymentDetails},
		CcbillClubSupporter: &hades.CCBillClubSupporter{
			ClubId: c.clubId,
		},
		AccountInitiator: &hades.AccountInitiator{
			AccountId: c.accountId,
		},
		CcbillFlexFormsDetails: &hades.CCBillFlexFormsDetails{
			InitialPrice:    billInitialPrice,
			InitialPeriod:   billInitialPeriod,
			RecurringPrice:  billRecurringPrice,
			RecurringPeriod: billRecurringPeriod,
			NumRebills:      billNumberRebills,
			CurrencyCode:    billCurrencyCode,
			Digest:          ccbillFormDigest,
		},
	}

	// create an encrypted ccbill payment link that will be passed to other services
	encrypted, err := encryptCCBillPayment(paymentToken)

	if err != nil {
		return nil, err
	}

	return encrypted, nil
}
