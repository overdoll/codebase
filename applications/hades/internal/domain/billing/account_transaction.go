package billing

import (
	"overdoll/libraries/errors/domainerror"
	"overdoll/libraries/money"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
	"time"
)

type AccountTransaction struct {
	*paging.Node

	accountId string
	id        string

	createdAt time.Time

	transaction Transaction

	clubSupporterSubscriptionId *string

	paymentMethod *PaymentMethod

	amount   uint64
	currency money.Currency

	billedAtDate    time.Time
	nextBillingDate time.Time

	voidedAt   *time.Time
	voidReason *string

	ccbillSubscriptionId *string
	ccbillTransactionId  *string

	events []*AccountTransactionEvent
}

func NewInitialPaymentClubSubscriptionAccountTransaction(accountId, id, clubSupporterSubscriptionId, ccbillTransactionId, ccbillSubscriptionId string, timestamp, billedAtDate, nextBillingDate time.Time, amount uint64, currency money.Currency, paymentMethod *PaymentMethod) (*AccountTransaction, error) {
	return &AccountTransaction{
		accountId:                   accountId,
		id:                          id,
		createdAt:                   timestamp,
		transaction:                 Payment,
		amount:                      amount,
		billedAtDate:                billedAtDate,
		nextBillingDate:             nextBillingDate,
		currency:                    currency,
		clubSupporterSubscriptionId: &clubSupporterSubscriptionId,
		ccbillSubscriptionId:        &ccbillSubscriptionId,
		ccbillTransactionId:         &ccbillTransactionId,
		paymentMethod:               paymentMethod,
	}, nil
}

func NewInvoicePaymentClubSubscriptionAccountTransaction(accountId, id, clubSupporterSubscriptionId, ccbillTransactionId, ccbillSubscriptionId string, timestamp, billedAtDate, nextBillingDate time.Time, amount uint64, currency money.Currency, paymentMethod *PaymentMethod) (*AccountTransaction, error) {
	return &AccountTransaction{
		accountId:                   accountId,
		id:                          id,
		createdAt:                   timestamp,
		transaction:                 Payment,
		amount:                      amount,
		billedAtDate:                billedAtDate,
		nextBillingDate:             nextBillingDate,
		currency:                    currency,
		ccbillTransactionId:         &ccbillTransactionId,
		clubSupporterSubscriptionId: &clubSupporterSubscriptionId,
		ccbillSubscriptionId:        &ccbillSubscriptionId,
		paymentMethod:               paymentMethod,
	}, nil
}

func (c *AccountTransaction) AccountId() string {
	return c.accountId
}

func (c *AccountTransaction) Id() string {
	return c.id
}

func (c *AccountTransaction) CreatedAt() time.Time {
	return c.createdAt
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

func (c *AccountTransaction) Amount() uint64 {
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

func (c *AccountTransaction) MakeRefunded(id string, timestamp time.Time, amount uint64, currency money.Currency, reason string) error {
	c.transaction = Refund
	c.events = append(c.events, &AccountTransactionEvent{
		id:        id,
		createdAt: timestamp,
		amount:    amount,
		currency:  currency,
		reason:    reason,
	})
	return nil
}

func (c *AccountTransaction) MakeChargeback(id string, timestamp time.Time, amount uint64, currency money.Currency, reason string) error {
	c.transaction = Chargeback
	c.events = append(c.events, &AccountTransactionEvent{
		id:        id,
		createdAt: timestamp,
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

func (c *AccountTransaction) GetTotalRefunded() uint64 {

	var sum uint64

	for _, i := range c.events {
		sum += i.amount
	}

	return sum
}

func (c *AccountTransaction) RequestRefund(requester *principal.Principal, amount uint64) error {

	if !requester.IsStaff() {
		return principal.ErrNotAuthorized
	}

	if c.transaction != Payment && c.transaction != Refund {
		return domainerror.NewValidation("transaction in incorrect state")
	}

	sum := c.GetTotalRefunded()

	if sum+amount > c.amount {
		return domainerror.NewValidation("over refund threshold")
	}

	return nil
}

func (c *AccountTransaction) RequestVoid(requester *principal.Principal) error {

	if c.transaction != Payment {
		return domainerror.NewValidation("transaction in incorrect state")
	}

	if !requester.IsStaff() {
		return principal.ErrNotAuthorized
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

	if !requester.IsStaff() {
		return nil, principal.ErrNotAuthorized
	}

	// subtract the amount already refunded from the total amount
	newAmount := c.Amount() - c.GetTotalRefunded()

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

func UnmarshalAccountTransactionFromDatabase(accountId, id string, timestamp time.Time, transaction string, paymentMethod *PaymentMethod, amount uint64, currency string, billedAtDate, nextBillingDate time.Time, ccbillSubscriptionId, ccbillTransactionId, clubSupporterSubscriptionId *string, voidedAt *time.Time, voidReason *string, events []*AccountTransactionEvent) *AccountTransaction {
	tr, _ := TransactionFromString(transaction)
	cr, _ := money.CurrencyFromString(currency)

	return &AccountTransaction{
		accountId:                   accountId,
		id:                          id,
		createdAt:                   timestamp,
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

func CanViewAccountTransactionsCount(requester *principal.Principal, accountId string) error {

	if requester.IsStaff() {
		return nil
	}

	if err := requester.BelongsToAccount(accountId); err != nil {
		return err
	}

	return nil
}

func CanViewAccountTransactions(requester *principal.Principal, filters *AccountTransactionsFilters, subscription *AccountClubSupporterSubscription) error {

	if requester.IsStaff() {
		return nil
	}

	if filters.AccountId() != nil {
		if err := requester.BelongsToAccount(*filters.AccountId()); err != nil {
			return err
		}
	}

	if subscription != nil {
		if err := requester.BelongsToAccount(subscription.AccountId()); err != nil {
			return err
		}
	}

	return nil
}
