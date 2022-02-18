package billing

import (
	"errors"
	"overdoll/libraries/paging"
	"time"
)

var (
	ErrCCBillSubscriptionNotFound = errors.New("ccbill subscription not found")
)

type CCBillSubscriptionDetails struct {
	*paging.Node

	accountId string
	clubId    string

	paymentMethod *PaymentMethod

	ccbillSubscriptionId string

	idempotencyKey string

	subscriptionInitialPrice   float64
	subscriptionRecurringPrice float64
	subscriptionCurrency       Currency

	billedInitialPrice   float64
	billedRecurringPrice float64
	billedCurrency       Currency

	accountingInitialPrice   float64
	accountingRecurringPrice float64
	accountingCurrency       Currency

	updatedAt time.Time
}

func NewCCBillSubscriptionDetails(accountId, clubId, ccbillSubscriptionId string, paymentMethod *PaymentMethod,
	subscriptionInitialPrice, subscriptionRecurringPrice float64, subscriptionCurrency string,
	billedInitialPrice, billedRecurringPrice float64, billedCurrency string,
	accountingInitialPrice, accountingRecurringPrice float64, accountingCurrency string,
	idempotencyKey string) (*CCBillSubscriptionDetails, error) {

	crsub, _ := CurrencyFromString(subscriptionCurrency)

	crbilled, _ := CurrencyFromString(billedCurrency)

	craccounting, _ := CurrencyFromString(accountingCurrency)

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

		paymentMethod:        paymentMethod,
		ccbillSubscriptionId: ccbillSubscriptionId,
		idempotencyKey:       idempotencyKey,
		updatedAt:            time.Now(),
	}, nil
}

func (c *CCBillSubscriptionDetails) AccountId() string {
	return c.accountId
}

func (c *CCBillSubscriptionDetails) ClubId() string {
	return c.clubId
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

func (c *CCBillSubscriptionDetails) SubscriptionInitialPrice() float64 {
	return c.subscriptionInitialPrice
}

func (c *CCBillSubscriptionDetails) SubscriptionRecurringPrice() float64 {
	return c.subscriptionRecurringPrice
}

func (c *CCBillSubscriptionDetails) SubscriptionCurrency() Currency {
	return c.subscriptionCurrency
}

func (c *CCBillSubscriptionDetails) BilledInitialPrice() float64 {
	return c.billedInitialPrice
}

func (c *CCBillSubscriptionDetails) BilledRecurringPrice() float64 {
	return c.billedRecurringPrice
}

func (c *CCBillSubscriptionDetails) BilledCurrency() Currency {
	return c.billedCurrency
}

func (c *CCBillSubscriptionDetails) AccountingInitialPrice() float64 {
	return c.accountingInitialPrice
}

func (c *CCBillSubscriptionDetails) AccountingRecurringPrice() float64 {
	return c.accountingRecurringPrice
}

func (c *CCBillSubscriptionDetails) AccountingCurrency() Currency {
	return c.accountingCurrency
}

func (c *CCBillSubscriptionDetails) IdempotencyKey() string {
	return c.idempotencyKey
}

func (c *CCBillSubscriptionDetails) UpdatePaymentMethod(paymentMethod *PaymentMethod) error {
	c.paymentMethod = paymentMethod
	return nil
}

func UnmarshalCCBillSubscriptionDetailsFromDatabase(accountId, clubId, ccbillSubscriptionId string, paymentMethod *PaymentMethod, updatedAt time.Time,
	subscriptionInitialPrice, subscriptionRecurringPrice float64, subscriptionCurrency string,
	billedInitialPrice, billedRecurringPrice float64, billedCurrency string,
	accountingInitialPrice, accountingRecurringPrice float64, accountingCurrency string, idempotencyKey string) *CCBillSubscriptionDetails {

	crsub, _ := CurrencyFromString(subscriptionCurrency)

	crbilled, _ := CurrencyFromString(billedCurrency)

	craccounting, _ := CurrencyFromString(accountingCurrency)

	return &CCBillSubscriptionDetails{
		accountId:                  accountId,
		clubId:                     clubId,
		subscriptionInitialPrice:   subscriptionInitialPrice,
		subscriptionCurrency:       crsub,
		subscriptionRecurringPrice: subscriptionRecurringPrice,

		billedCurrency:       crbilled,
		billedInitialPrice:   billedInitialPrice,
		billedRecurringPrice: billedRecurringPrice,

		accountingCurrency:       craccounting,
		accountingInitialPrice:   accountingInitialPrice,
		accountingRecurringPrice: accountingRecurringPrice,
		paymentMethod:            paymentMethod,
		ccbillSubscriptionId:     ccbillSubscriptionId,
		updatedAt:                updatedAt,
		idempotencyKey:           idempotencyKey,
	}
}
