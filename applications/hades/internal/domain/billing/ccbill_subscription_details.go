package billing

import (
	"errors"
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

	paymentMethod *PaymentMethod

	ccbillSubscriptionId string

	idempotencyKey string

	subscriptionInitialPrice   int64
	subscriptionRecurringPrice int64
	subscriptionCurrency       Currency

	billedInitialPrice   int64
	billedRecurringPrice int64
	billedCurrency       Currency

	accountingInitialPrice   int64
	accountingRecurringPrice int64
	accountingCurrency       Currency

	updatedAt time.Time
}

func NewCCBillSubscriptionDetails(accountId, clubId, ccbillSubscriptionId string, paymentMethod *PaymentMethod,
	subscriptionInitialPrice, subscriptionRecurringPrice int64, subscriptionCurrency string,
	billedInitialPrice, billedRecurringPrice int64, billedCurrency string,
	accountingInitialPrice, accountingRecurringPrice int64, accountingCurrency string,
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

func (c *CCBillSubscriptionDetails) SubscriptionInitialPrice() int64 {
	return c.subscriptionInitialPrice
}

func (c *CCBillSubscriptionDetails) SubscriptionRecurringPrice() int64 {
	return c.subscriptionRecurringPrice
}

func (c *CCBillSubscriptionDetails) SubscriptionCurrency() Currency {
	return c.subscriptionCurrency
}

func (c *CCBillSubscriptionDetails) BilledInitialPrice() int64 {
	return c.billedInitialPrice
}

func (c *CCBillSubscriptionDetails) BilledRecurringPrice() int64 {
	return c.billedRecurringPrice
}

func (c *CCBillSubscriptionDetails) BilledCurrency() Currency {
	return c.billedCurrency
}

func (c *CCBillSubscriptionDetails) AccountingInitialPrice() int64 {
	return c.accountingInitialPrice
}

func (c *CCBillSubscriptionDetails) AccountingRecurringPrice() int64 {
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

func (c *CCBillSubscriptionDetails) CanView(requester *principal.Principal) error {

	if !requester.IsStaff() {
		return errors.New("only staff can view ccbill subscription details")
	}

	return nil
}

func UnmarshalCCBillSubscriptionDetailsFromDatabase(accountId, clubId, ccbillSubscriptionId string, paymentMethod *PaymentMethod, updatedAt time.Time,
	subscriptionInitialPrice, subscriptionRecurringPrice int64, subscriptionCurrency string,
	billedInitialPrice, billedRecurringPrice int64, billedCurrency string,
	accountingInitialPrice, accountingRecurringPrice int64, accountingCurrency string, idempotencyKey string) *CCBillSubscriptionDetails {

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
