package billing

import (
	"errors"
	"overdoll/applications/hades/internal/domain/cancellation"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
	"time"
)

var (
	ErrAccountClubSupportSubscriptionNotFound = errors.New("account club support subscription not found")
)

type AccountClubSupporterSubscription struct {
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

	cancellationReasonId *string
}

func NewAccountClubSupporterSubscriptionFromCCBill(accountId, clubId, ccbillSubscriptionId string, supporterSince, lastBillingDate, nextBillingDate time.Time, amount float64, currency string, paymentMethod *PaymentMethod) (*AccountClubSupporterSubscription, error) {

	currenc, err := CurrencyFromString(currency)

	if err != nil {
		return nil, err
	}

	return &AccountClubSupporterSubscription{
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

func (c *AccountClubSupporterSubscription) Id() string {
	return c.id
}

func (c *AccountClubSupporterSubscription) AccountId() string {
	return c.accountId
}

func (c *AccountClubSupporterSubscription) ClubId() string {
	return c.clubId
}

func (c *AccountClubSupporterSubscription) CancellationReasonId() *string {
	return c.cancellationReasonId
}

func (c *AccountClubSupporterSubscription) UpdatedAt() time.Time {
	return c.updatedAt
}

func (c *AccountClubSupporterSubscription) Status() SupportStatus {
	return c.status
}

func (c *AccountClubSupporterSubscription) SupporterSince() time.Time {
	return c.supporterSince
}

func (c *AccountClubSupporterSubscription) CancelledAt() *time.Time {
	return c.cancelledAt
}

func (c *AccountClubSupporterSubscription) LastBillingDate() time.Time {
	return c.lastBillingDate
}

func (c *AccountClubSupporterSubscription) NextBillingDate() time.Time {
	return c.nextBillingDate
}

func (c *AccountClubSupporterSubscription) BillingAmount() float64 {
	return c.billingAmount
}

func (c *AccountClubSupporterSubscription) BillingCurrency() Currency {
	return c.billingCurrency
}

func (c *AccountClubSupporterSubscription) PaymentMethod() *PaymentMethod {
	return c.paymentMethod
}

func (c *AccountClubSupporterSubscription) CCBillSubscriptionId() string {
	return c.ccbillSubscriptionId
}

func (c *AccountClubSupporterSubscription) IsCCBill() bool {
	return c.ccbillSubscriptionId != ""
}

func (c *AccountClubSupporterSubscription) UpdatePaymentMethod(paymentMethod *PaymentMethod) error {
	c.paymentMethod = paymentMethod
	return nil
}

func (c *AccountClubSupporterSubscription) MarkCancelled(cancelledAt time.Time) error {
	c.cancelledAt = &cancelledAt
	c.status = Cancelled
	return nil
}

func (c *AccountClubSupporterSubscription) RequestVoidOrRefund(requester *principal.Principal) error {
	if !requester.IsStaff() {
		return errors.New("only staff can issue void or refunds")
	}

	return c.MarkCancelled(time.Now())
}

func (c *AccountClubSupporterSubscription) RequestCancel(requester *principal.Principal, cancellationReason *cancellation.Reason) error {
	if err := requester.BelongsToAccount(c.accountId); err != nil {
		return err
	}
	id := cancellationReason.ID()
	c.cancellationReasonId = &id

	return c.MarkCancelled(time.Now())
}

func (c *AccountClubSupporterSubscription) RequestExtend(requester *principal.Principal, days int) error {
	if err := requester.BelongsToAccount(c.accountId); err != nil {
		return err
	}

	c.nextBillingDate = c.nextBillingDate.Add(time.Hour * 24 * time.Duration(days))

	return nil
}

func (c *AccountClubSupporterSubscription) UpdateBillingDate(nextBillingDate time.Time) error {
	c.nextBillingDate = nextBillingDate
	return nil
}

func (c *AccountClubSupporterSubscription) MakeReactivated(nextBillingDate time.Time) error {
	c.cancelledAt = nil
	c.status = Active
	c.nextBillingDate = nextBillingDate
	return nil
}

func (c *AccountClubSupporterSubscription) CanView(requester *principal.Principal) error {
	return CanViewAccountClubSupporterSubscription(requester, c.accountId)
}

func UnmarshalAccountClubSupporterSubscriptionFromDatabase(id, accountId, clubId, status string, supporterSince, lastBillingDate, nextBillingDate time.Time, billingAmount float64, billingCurrency string, paymentMethod *PaymentMethod, ccbillSubscriptionId string, cancelledAt *time.Time, updatedAt time.Time, cancellationReasonId *string) *AccountClubSupporterSubscription {
	st, _ := SupportStatusFromString(status)
	cr, _ := CurrencyFromString(billingCurrency)
	return &AccountClubSupporterSubscription{
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
		cancellationReasonId: cancellationReasonId,
	}
}

func CanViewAccountClubSupporterSubscription(requester *principal.Principal, accountId string) error {
	if requester.IsStaff() {
		return nil
	}

	if err := requester.BelongsToAccount(accountId); err != nil {
		return err
	}

	return nil
}
