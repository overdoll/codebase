package billing

import (
	"errors"
	"overdoll/libraries/money"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
	"time"
)

var (
	ErrCCBillSubscriptionNotFound = errors.New("ccbill subscription not found")
)

type CCBillSubscriptionDetails struct {
	*paging.Node

	accountId string
	clubId    string

	duplicate bool

	paymentMethod *PaymentMethod

	ccbillSubscriptionId               string
	accountClubSupporterSubscriptionId string

	subscriptionInitialPrice   uint64
	subscriptionRecurringPrice uint64
	subscriptionCurrency       money.Currency

	billedInitialPrice   uint64
	billedRecurringPrice uint64
	billedCurrency       money.Currency

	accountingInitialPrice   uint64
	accountingRecurringPrice uint64
	accountingCurrency       money.Currency

	updatedAt time.Time
}

func NewCCBillSubscriptionDetails(accountId, clubId, ccbillSubscriptionId string, paymentMethod *PaymentMethod,
	subscriptionInitialPrice, subscriptionRecurringPrice uint64, subscriptionCurrency string,
	billedInitialPrice, billedRecurringPrice uint64, billedCurrency string,
	accountingInitialPrice, accountingRecurringPrice uint64, accountingCurrency string,
	accountClubSupporterSubscriptionId string) (*CCBillSubscriptionDetails, error) {

	crsub, _ := money.CurrencyFromString(subscriptionCurrency)

	crbilled, _ := money.CurrencyFromString(billedCurrency)

	craccounting, _ := money.CurrencyFromString(accountingCurrency)

	return &CCBillSubscriptionDetails{
		accountId: accountId,
		clubId:    clubId,

		subscriptionInitialPrice:   subscriptionInitialPrice,
		subscriptionCurrency:       crsub,
		subscriptionRecurringPrice: subscriptionRecurringPrice,

		billedCurrency:       crbilled,
		billedInitialPrice:   billedInitialPrice,
		billedRecurringPrice: billedRecurringPrice,

		accountingCurrency:       craccounting,
		accountingInitialPrice:   accountingInitialPrice,
		accountingRecurringPrice: accountingRecurringPrice,

		paymentMethod:                      paymentMethod,
		ccbillSubscriptionId:               ccbillSubscriptionId,
		accountClubSupporterSubscriptionId: accountClubSupporterSubscriptionId,
		updatedAt:                          time.Now(),
		duplicate:                          false,
	}, nil
}

func (c *CCBillSubscriptionDetails) AccountId() string {
	return c.accountId
}

func (c *CCBillSubscriptionDetails) ClubId() string {
	return c.clubId
}

func (c *CCBillSubscriptionDetails) Duplicate() bool {
	return c.duplicate
}

func (c *CCBillSubscriptionDetails) UpdatedAt() time.Time {
	return c.updatedAt
}

func (c *CCBillSubscriptionDetails) PaymentMethod() *PaymentMethod {
	return c.paymentMethod
}

func (c *CCBillSubscriptionDetails) CCBillSubscriptionId() string {
	return c.ccbillSubscriptionId
}

func (c *CCBillSubscriptionDetails) SubscriptionInitialPrice() uint64 {
	return c.subscriptionInitialPrice
}

func (c *CCBillSubscriptionDetails) SubscriptionRecurringPrice() uint64 {
	return c.subscriptionRecurringPrice
}

func (c *CCBillSubscriptionDetails) SubscriptionCurrency() money.Currency {
	return c.subscriptionCurrency
}

func (c *CCBillSubscriptionDetails) BilledInitialPrice() uint64 {
	return c.billedInitialPrice
}

func (c *CCBillSubscriptionDetails) BilledRecurringPrice() uint64 {
	return c.billedRecurringPrice
}

func (c *CCBillSubscriptionDetails) BilledCurrency() money.Currency {
	return c.billedCurrency
}

func (c *CCBillSubscriptionDetails) AccountingInitialPrice() uint64 {
	return c.accountingInitialPrice
}

func (c *CCBillSubscriptionDetails) AccountingRecurringPrice() uint64 {
	return c.accountingRecurringPrice
}

func (c *CCBillSubscriptionDetails) AccountingCurrency() money.Currency {
	return c.accountingCurrency
}

func (c *CCBillSubscriptionDetails) AccountClubSupporterSubscriptionId() string {
	return c.accountClubSupporterSubscriptionId
}

func (c *CCBillSubscriptionDetails) UpdatePaymentMethod(paymentMethod *PaymentMethod) error {
	c.paymentMethod = paymentMethod
	return nil
}

func (c *CCBillSubscriptionDetails) CanView(requester *principal.Principal) error {

	if !requester.IsStaff() {
		return errors.New("only staff can view ccbill subscription details")
	}

	return nil
}

func UnmarshalCCBillSubscriptionDetailsFromDatabase(accountId, clubId, ccbillSubscriptionId string, paymentMethod *PaymentMethod, updatedAt time.Time,
	subscriptionInitialPrice, subscriptionRecurringPrice uint64, subscriptionCurrency string,
	billedInitialPrice, billedRecurringPrice uint64, billedCurrency string,
	accountingInitialPrice, accountingRecurringPrice uint64, accountingCurrency string, accountClubSupporterSubscriptionId string, duplicate bool) *CCBillSubscriptionDetails {

	crsub, _ := money.CurrencyFromString(subscriptionCurrency)

	crbilled, _ := money.CurrencyFromString(billedCurrency)

	craccounting, _ := money.CurrencyFromString(accountingCurrency)

	return &CCBillSubscriptionDetails{
		accountId:                  accountId,
		clubId:                     clubId,
		subscriptionInitialPrice:   subscriptionInitialPrice,
		subscriptionCurrency:       crsub,
		subscriptionRecurringPrice: subscriptionRecurringPrice,

		billedCurrency:       crbilled,
		billedInitialPrice:   billedInitialPrice,
		billedRecurringPrice: billedRecurringPrice,

		accountingCurrency:                 craccounting,
		accountingInitialPrice:             accountingInitialPrice,
		accountingRecurringPrice:           accountingRecurringPrice,
		paymentMethod:                      paymentMethod,
		ccbillSubscriptionId:               ccbillSubscriptionId,
		updatedAt:                          updatedAt,
		accountClubSupporterSubscriptionId: accountClubSupporterSubscriptionId,

		duplicate: duplicate,
	}
}
