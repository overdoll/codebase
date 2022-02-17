package billing

import (
	"errors"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
	"time"
)

var (
	ErrAccountClubSupportSubscriptionNotFound = errors.New("account club support subscription not found")
)

type AccountClubSupportSubscription struct {
	*paging.Node

	accountId string
	clubId    string

	id string

	status SupportStatus

	supporterSince  time.Time
	lastBillingDate time.Time
	nextBillingDate time.Time

	updatedAt time.Time

	cancelledAt *time.Time

	billingAmount   float64
	billingCurrency Currency

	paymentMethod *PaymentMethod

	ccbillSubscriptionId string
}

func NewAccountClubSupportSubscriptionFromCCBill(accountId, clubId, ccbillSubscriptionId string, supporterSince, lastBillingDate, nextBillingDate time.Time, amount float64, currency string, paymentMethod *PaymentMethod) (*AccountClubSupportSubscription, error) {

	currenc, err := CurrencyFromString(currency)

	if err != nil {
		return nil, err
	}

	return &AccountClubSupportSubscription{
		accountId:            accountId,
		clubId:               clubId,
		id:                   ccbillSubscriptionId,
		status:               Active,
		supporterSince:       supporterSince,
		lastBillingDate:      lastBillingDate,
		nextBillingDate:      nextBillingDate,
		cancelledAt:          nil,
		billingAmount:        amount,
		billingCurrency:      currenc,
		paymentMethod:        paymentMethod,
		updatedAt:            time.Now(),
		ccbillSubscriptionId: ccbillSubscriptionId,
	}, nil
}

func (c *AccountClubSupportSubscription) Id() string {
	return c.id
}

func (c *AccountClubSupportSubscription) AccountId() string {
	return c.accountId
}

func (c *AccountClubSupportSubscription) ClubId() string {
	return c.clubId
}

func (c *AccountClubSupportSubscription) UpdatedAt() time.Time {
	return c.updatedAt
}

func (c *AccountClubSupportSubscription) Status() SupportStatus {
	return c.status
}

func (c *AccountClubSupportSubscription) SupporterSince() time.Time {
	return c.supporterSince
}

func (c *AccountClubSupportSubscription) CancelledAt() *time.Time {
	return c.cancelledAt
}

func (c *AccountClubSupportSubscription) LastBillingDate() time.Time {
	return c.lastBillingDate
}

func (c *AccountClubSupportSubscription) NextBillingDate() time.Time {
	return c.nextBillingDate
}

func (c *AccountClubSupportSubscription) BillingAmount() float64 {
	return c.billingAmount
}

func (c *AccountClubSupportSubscription) BillingCurrency() Currency {
	return c.billingCurrency
}

func (c *AccountClubSupportSubscription) PaymentMethod() *PaymentMethod {
	return c.paymentMethod
}

func (c *AccountClubSupportSubscription) CCBillSubscriptionId() string {
	return c.ccbillSubscriptionId
}

func (c *AccountClubSupportSubscription) IsCCBill() bool {
	return c.ccbillSubscriptionId != ""
}

func (c *AccountClubSupportSubscription) MarkCancelled(cancelledAt time.Time) error {
	c.cancelledAt = &cancelledAt
	c.status = Cancelled
	return nil
}

func (c *AccountClubSupportSubscription) UpdateBillingDate(nextBillingDate time.Time) error {
	c.nextBillingDate = nextBillingDate
	return nil
}

func (c *AccountClubSupportSubscription) MakeReactivated(nextBillingDate time.Time) error {
	c.cancelledAt = nil
	c.status = Active
	c.nextBillingDate = nextBillingDate
	return nil
}

func UnmarshalAccountClubSupportSubscriptionFromDatabase(id, accountId, clubId, status string, supporterSince, lastBillingDate, nextBillingDate time.Time, billingAmount float64, billingCurrency string, paymentMethod *PaymentMethod, ccbillSubscriptionId string, cancelledAt *time.Time, updatedAt time.Time) *AccountClubSupportSubscription {
	st, _ := SupportStatusFromString(status)
	cr, _ := CurrencyFromString(billingCurrency)
	return &AccountClubSupportSubscription{
		id:                   id,
		accountId:            accountId,
		clubId:               clubId,
		status:               st,
		cancelledAt:          cancelledAt,
		supporterSince:       supporterSince,
		lastBillingDate:      lastBillingDate,
		nextBillingDate:      nextBillingDate,
		billingAmount:        billingAmount,
		billingCurrency:      cr,
		paymentMethod:        paymentMethod,
		ccbillSubscriptionId: ccbillSubscriptionId,
		updatedAt:            updatedAt,
	}
}

func CanViewAccountClubSupport(requester *principal.Principal, accountId string) error {
	if err := requester.BelongsToAccount(accountId); err != nil {
		return err
	}

	return nil
}
