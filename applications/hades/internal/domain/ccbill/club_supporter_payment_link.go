package ccbill

import (
	"crypto/md5"
	"encoding/hex"
	"errors"
	"os"
	"overdoll/applications/hades/internal/domain/billing"
	"overdoll/applications/hades/internal/domain/club"
	hades "overdoll/applications/hades/proto"
	"overdoll/libraries/principal"
	"strconv"
)

type ClubSupporterPaymentLink struct {
	savePaymentDetails bool
	clubId             string
	accountId          string
	email              string

	amount   uint64
	currency int
}

func NewClubSupporterPaymentLink(requester *principal.Principal, club *club.Club, savePaymentDetails bool, price *billing.Price) (*ClubSupporterPaymentLink, error) {

	if !club.CanSupport() {
		return nil, errors.New("club cannot be supported at this time")
	}

	return &ClubSupporterPaymentLink{
		savePaymentDetails: savePaymentDetails,
		clubId:             club.Id(),
		accountId:          requester.AccountId(),
		amount:             price.Amount(),
		email:              requester.Email(),
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

	amount, err := ConvertAmountToCCBillFloat(c.amount, c.currency)

	if err != nil {
		return nil, err
	}

	billInitialPrice := strconv.FormatFloat(amount, 'f', 2, 64)
	billInitialPeriod := strconv.Itoa(ccbillInitialPeriod)

	billRecurringPrice := strconv.FormatFloat(amount, 'f', 2, 64)
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
			PricingDigest: ccbillFormDigest,
			Email:         c.email,
		},
		CcbillPricingDetails: &hades.CCBillPricingDetails{
			InitialPrice:    billInitialPrice,
			InitialPeriod:   billInitialPeriod,
			RecurringPrice:  billRecurringPrice,
			RecurringPeriod: billRecurringPeriod,
			NumRebills:      billNumberRebills,
			CurrencyCode:    billCurrencyCode,
		},
	}

	// create an encrypted ccbill payment link that will be passed to other services
	encrypted, err := EncryptCCBillPayment(paymentToken)

	if err != nil {
		return nil, err
	}

	return encrypted, nil
}
