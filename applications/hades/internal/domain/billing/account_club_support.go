package billing

import (
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
	"time"
)

type AccountClubSupport struct {
	*paging.Node

	accountId string
	clubId    string

	status SupportStatus

	supporterSince  time.Time
	lastBillingDate time.Time
	nextBillingDate time.Time

	billingAmount   float64
	billingCurrency Currency

	paymentMethod *PaymentMethod

	ccbillSubscriptionId string
}

func (c *AccountClubSupport) AccountId() string {
	return c.accountId
}

func (c *AccountClubSupport) ClubId() string {
	return c.clubId
}

func (c *AccountClubSupport) Status() SupportStatus {
	return c.status
}

func (c *AccountClubSupport) SupporterSince() time.Time {
	return c.supporterSince
}

func (c *AccountClubSupport) LastBillingDate() time.Time {
	return c.lastBillingDate
}

func (c *AccountClubSupport) NextBillingDate() time.Time {
	return c.nextBillingDate
}

func (c *AccountClubSupport) BillingAmount() float64 {
	return c.billingAmount
}

func (c *AccountClubSupport) BillingCurrency() Currency {
	return c.billingCurrency
}

func (c *AccountClubSupport) PaymentMethod() *PaymentMethod {
	return c.paymentMethod
}

func (c *AccountClubSupport) CCBillSubscriptionId() string {
	return c.ccbillSubscriptionId
}

func (c *AccountClubSupport) IsCCBill() bool {
	return c.ccbillSubscriptionId != ""
}

func UnmarshalAccountClubSupportFromDatabase(accountId, clubId, status string, supporterSince, lastBillingDate, nextBillingDate time.Time, billingAmount float64, billingCurrency string, paymentMethod *PaymentMethod, ccbillSubscriptionId string) *AccountClubSupport {
	st, _ := SupportStatusFromString(status)
	cr, _ := CurrencyFromString(billingCurrency)
	return &AccountClubSupport{
		accountId:            accountId,
		clubId:               clubId,
		status:               st,
		supporterSince:       supporterSince,
		lastBillingDate:      lastBillingDate,
		nextBillingDate:      nextBillingDate,
		billingAmount:        billingAmount,
		billingCurrency:      cr,
		paymentMethod:        paymentMethod,
		ccbillSubscriptionId: ccbillSubscriptionId,
	}
}

func CanViewAccountClubSupport(requester *principal.Principal, accountId string) error {
	if err := requester.BelongsToAccount(accountId); err != nil {
		return err
	}

	return nil
}
