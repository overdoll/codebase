package billing

import (
	"errors"
	"overdoll/libraries/money"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
	"overdoll/libraries/uuid"
	"time"
)

var (
	ErrAccountTransactionNotFound = errors.New("account transaction not found")
)

type AccountTransaction struct {
	*paging.Node

	accountId string
	id        string

	timestamp time.Time

	transaction Transaction

	clubSupporterSubscriptionId *string

	paymentMethod *PaymentMethod

	amount   int64
	currency money.Currency

	billedAtDate    time.Time
	nextBillingDate time.Time

	voidedAt   *time.Time
	voidReason *string

	ccbillSubscriptionId *string
	ccbillTransactionId  *string

	events []*AccountTransactionEvent
}

func NewInitialPaymentClubSubscriptionAccountTransaction(accountId, id, subscriptionId string, timestamp, billedAtDate, nextBillingDate time.Time, amount int64, currency string, paymentMethod *PaymentMethod) (*AccountTransaction, error) {
	cr, err := money.CurrencyFromString(currency)

	if err != nil {
		return nil, err
	}

	return &AccountTransaction{
		accountId:                   accountId,
		id:                          id,
		timestamp:                   timestamp,
		transaction:                 Payment,
		amount:                      amount,
		billedAtDate:                billedAtDate,
		nextBillingDate:             nextBillingDate,
		currency:                    cr,
		clubSupporterSubscriptionId: &subscriptionId,
		ccbillSubscriptionId:        &subscriptionId,
		ccbillTransactionId:         &id,
		paymentMethod:               paymentMethod,
	}, nil
}

func NewInvoicePaymentClubSubscriptionAccountTransaction(accountId, id, subscriptionId string, timestamp, billedAtDate, nextBillingDate time.Time, amount int64, currency string, paymentMethod *PaymentMethod) (*AccountTransaction, error) {
	cr, err := money.CurrencyFromString(currency)

	if err != nil {
		return nil, err
	}

	return &AccountTransaction{
		accountId:                   accountId,
		id:                          id,
		timestamp:                   timestamp,
		transaction:                 Payment,
		amount:                      amount,
		billedAtDate:                billedAtDate,
		nextBillingDate:             nextBillingDate,
		currency:                    cr,
		ccbillTransactionId:         &id,
		clubSupporterSubscriptionId: &subscriptionId,
		ccbillSubscriptionId:        &subscriptionId,
		paymentMethod:               paymentMethod,
	}, nil
}

func (c *AccountTransaction) AccountId() string {
	return c.accountId
}

func (c *AccountTransaction) Id() string {
	return c.id
}

func (c *AccountTransaction) Timestamp() time.Time {
	return c.timestamp
}

func (c *AccountTransaction) Type() Transaction {
	return c.transaction
}

func (c *AccountTransaction) ClubSupporterSubscriptionId() *string {
	return c.clubSupporterSubscriptionId
}

func (c *AccountTransaction) PaymentMethod() *PaymentMethod {
	return c.paymentMethod
}

func (c *AccountTransaction) Amount() int64 {
	return c.amount
}

func (c *AccountTransaction) Currency() money.Currency {
	return c.currency
}

func (c *AccountTransaction) VoidedAt() *time.Time {
	return c.voidedAt
}

func (c *AccountTransaction) VoidReason() *string {
	return c.voidReason
}

func (c *AccountTransaction) BilledAtDate() time.Time {
	return c.billedAtDate
}

func (c *AccountTransaction) NextBillingDate() time.Time {
	return c.nextBillingDate
}

func (c *AccountTransaction) Events() []*AccountTransactionEvent {
	return c.events
}

func (c *AccountTransaction) CCBillSubscriptionId() *string {
	return c.ccbillSubscriptionId
}

func (c *AccountTransaction) CCBillTransactionId() *string {
	return c.ccbillTransactionId
}

func (c *AccountTransaction) MakeRefunded(timestamp time.Time, amount int64, currency money.Currency, reason string) error {
	c.transaction = Refund
	c.events = append(c.events, &AccountTransactionEvent{
		id:        uuid.New().String(),
		timestamp: timestamp,
		amount:    amount,
		currency:  currency,
		reason:    reason,
	})
	return nil
}

func (c *AccountTransaction) MakeChargeback(timestamp time.Time, amount int64, currency money.Currency, reason string) error {
	c.transaction = Chargeback
	c.events = append(c.events, &AccountTransactionEvent{
		id:        uuid.New().String(),
		timestamp: timestamp,
		amount:    amount,
		currency:  currency,
		reason:    reason,
	})
	return nil
}

func (c *AccountTransaction) MakeVoid(timestamp time.Time, reason string) error {
	c.transaction = Void
	c.voidedAt = &timestamp
	c.voidReason = &reason
	return nil
}

func (c *AccountTransaction) getTotalRefunded() int64 {

	var sum int64

	for _, i := range c.events {
		sum += i.amount
	}

	return sum
}

func (c *AccountTransaction) RequestRefund(requester *principal.Principal, amount int64) error {

	if c.transaction != Payment && c.transaction != Refund {
		return errors.New("transaction in incorrect state")
	}

	sum := c.getTotalRefunded()

	if sum+amount >= c.amount {
		return errors.New("over refund threshold")
	}

	if !requester.IsStaff() {
		return errors.New("only staff can issue refunds")
	}

	return nil
}

func (c *AccountTransaction) RequestVoid(requester *principal.Principal) error {

	if c.transaction != Payment {
		return errors.New("transaction in incorrect state")
	}

	if !requester.IsStaff() {
		return errors.New("only staff can issue voids")
	}

	return nil
}

func (c *AccountTransaction) CanView(requester *principal.Principal) error {

	if requester.IsStaff() {
		return nil
	}

	return requester.BelongsToAccount(c.accountId)
}

func (c *AccountTransaction) GenerateProratedRefundAmount(requester *principal.Principal) (*RefundAmount, error) {

	// subtract the amount already refunded from the total amount
	newAmount := c.Amount() - c.getTotalRefunded()

	refund, err := newRefundAmountWithProrated(
		newAmount,
		c.Currency(),
		c.BilledAtDate(),
		c.NextBillingDate(),
	)

	if err != nil {
		return nil, err
	}

	return refund, nil
}

func UnmarshalAccountTransactionFromDatabase(accountId, id string, timestamp time.Time, transaction string, paymentMethod *PaymentMethod, amount int64, currency string, billedAtDate, nextBillingDate time.Time, ccbillSubscriptionId, ccbillTransactionId, clubSupporterSubscriptionId *string, voidedAt *time.Time, voidReason *string, events []*AccountTransactionEvent) *AccountTransaction {
	tr, _ := TransactionFromString(transaction)
	cr, _ := money.CurrencyFromString(currency)

	return &AccountTransaction{
		accountId:                   accountId,
		id:                          id,
		timestamp:                   timestamp,
		transaction:                 tr,
		paymentMethod:               paymentMethod,
		amount:                      amount,
		currency:                    cr,
		billedAtDate:                billedAtDate,
		nextBillingDate:             nextBillingDate,
		ccbillSubscriptionId:        ccbillSubscriptionId,
		ccbillTransactionId:         ccbillTransactionId,
		clubSupporterSubscriptionId: clubSupporterSubscriptionId,
		voidReason:                  voidReason,
		voidedAt:                    voidedAt,
		events:                      events,
	}
}

func CanViewAccountTransactionHistory(requester *principal.Principal, accountId string) error {

	if err := requester.BelongsToAccount(accountId); err != nil {
		return err
	}

	return nil
}
