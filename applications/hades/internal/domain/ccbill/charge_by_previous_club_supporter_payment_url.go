package ccbill

import (
	"errors"
	"os"
	"overdoll/applications/hades/internal/domain/billing"
	hades "overdoll/applications/hades/proto"
	"overdoll/libraries/principal"
	"strconv"
)

type ChargeByPreviousClubSupporterPaymentUrl struct {
	clubId               string
	accountId            string
	ccbillSubscriptionId string

	amount   int64
	currency int
}

func NewChargeByPreviousClubSupporterPaymentUrl(requester *principal.Principal, clubId, ccbillSubscriptionId string, price *billing.Price) (*ChargeByPreviousClubSupporterPaymentUrl, error) {

	if !requester.IsSecure() {
		return nil, errors.New("account must be secure to use charge by previous id")
	}

	return &ChargeByPreviousClubSupporterPaymentUrl{
		clubId:               clubId,
		accountId:            requester.AccountId(),
		ccbillSubscriptionId: ccbillSubscriptionId,
		amount:               price.Amount(),
		currency:             currencyStringToCCBillCode[price.Currency().String()],
	}, nil
}

func (c *ChargeByPreviousClubSupporterPaymentUrl) ClubId() string {
	return c.clubId
}

func (c *ChargeByPreviousClubSupporterPaymentUrl) CCBillSubscriptionId() string {
	return c.ccbillSubscriptionId
}

func (c *ChargeByPreviousClubSupporterPaymentUrl) AccountId() string {
	return c.accountId
}

func (c *ChargeByPreviousClubSupporterPaymentUrl) GenerateUrl() (string, *string, error) {

	ccbillClientAccnum := os.Getenv("CCBILL_ACCOUNT_NUMBER")
	ccbillClientSubacc := os.Getenv("CCBILL_SUB_ACCOUNT_NUMBER")

	ccbillUsername := os.Getenv("CCBILL_DATALINK_USERNAME")
	ccbillPassword := os.Getenv("CCBILL_DATALINK_PASSWORD")

	amount, err := ConvertAmountToCCBillFloat(c.amount, c.currency)

	if err != nil {
		return "", nil, err
	}

	billInitialPrice := strconv.FormatFloat(amount, 'f', 2, 64)
	billInitialPeriod := strconv.Itoa(ccbillInitialPeriod)

	billRecurringPrice := strconv.FormatFloat(amount, 'f', 2, 64)
	billRecurringPeriod := strconv.Itoa(ccbillRecurringPeriod)
	billNumberRebills := strconv.Itoa(ccbillNumRebills)

	billCurrencyCode := strconv.Itoa(c.currency)

	paymentLink := &hades.CCBillPayment{
		CcbillClubSupporter: &hades.CCBillClubSupporter{
			ClubId: c.clubId,
		},
		AccountInitiator: &hades.AccountInitiator{
			AccountId: c.accountId,
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
	encrypted, err := EncryptCCBillPayment(paymentLink)

	if err != nil {
		return "", nil, err
	}

	query := "https://bill.ccbill.com/jpost/billingApi.cgi?" +
		"clientAccnum=" + ccbillClientAccnum +
		"&username=" + ccbillUsername +
		"&password=" + ccbillPassword +
		"&action=chargeByPreviousTransactionId" +
		"&initialPrice=" + billInitialPrice +
		"&initialPeriod=" + billInitialPeriod +
		"&recurringPrice=" + billRecurringPrice +
		"&recurringPeriod=" + billRecurringPeriod +
		"&rebills=" + billNumberRebills +
		"&subscriptionId=" + c.ccbillSubscriptionId +
		"&currencyCode=" + billCurrencyCode +
		"&newClientAccnum=" + ccbillClientAccnum +
		"&newClientSubacc=" + ccbillClientSubacc +
		"&sharedAuthentication=1" +
		"&overdollPaymentToken=" + *encrypted +
		"&returnXML=1"

	return query, encrypted, nil
}
