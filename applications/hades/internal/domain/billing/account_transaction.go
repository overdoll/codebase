package billing

import (
	"errors"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
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

	supportedClubId             *string
	clubSupporterSubscriptionId *string

	paymentMethod *PaymentMethod

	amount   *int64
	currency *Currency

	isRecurring *bool

	billingFailureNextRetryDate *time.Time

	billedAtDate    *time.Time
	nextBillingDate *time.Time
	voidedAt        *time.Time
	voidReason      *string

	ccbillSubscriptionId *string
	ccbillTransactionId  *string

	ccbillReason *string

	events []*AccountTransactionEvent
}

func NewInitialPaymentClubSubscriptionAccountTransaction(accountId, clubId, id, subscriptionId string, timestamp, billedAtDate, nextBillingDate time.Time, amount int64, currency string) (*AccountTransaction, error) {
	cr, err := CurrencyFromString(currency)

	if err != nil {
		return nil, err
	}

	return &AccountTransaction{
		accountId:                   accountId,
		id:                          id,
		timestamp:                   timestamp,
		transaction:                 Payment,
		supportedClubId:             &clubId,
		amount:                      &amount,
		billedAtDate:                &billedAtDate,
		nextBillingDate:             &nextBillingDate,
		currency:                    &cr,
		clubSupporterSubscriptionId: &subscriptionId,
		ccbillSubscriptionId:        &subscriptionId,
		ccbillTransactionId:         &id,
	}, nil
}

func NewInvoicePaymentClubSubscriptionAccountTransaction(accountId, clubId, id, subscriptionId string, timestamp, billedAtDate, nextBillingDate time.Time, amount int64, currency string, paymentMethod *PaymentMethod) (*AccountTransaction, error) {
	cr, err := CurrencyFromString(currency)

	if err != nil {
		return nil, err
	}

	return &AccountTransaction{
		accountId:                   accountId,
		id:                          id,
		timestamp:                   timestamp,
		transaction:                 Payment,
		supportedClubId:             &clubId,
		amount:                      &amount,
		billedAtDate:                &billedAtDate,
		nextBillingDate:             &nextBillingDate,
		currency:                    &cr,
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

func (c *AccountTransaction) Transaction() Transaction {
	return c.transaction
}

func (c *AccountTransaction) SupportedClubId() *string {
	return c.supportedClubId
}

func (c *AccountTransaction) PaymentMethod() *PaymentMethod {
	return c.paymentMethod
}

func (c *AccountTransaction) Amount() *int64 {
	return c.amount
}

func (c *AccountTransaction) Currency() *Currency {
	return c.currency
}

func (c *AccountTransaction) IsRecurring() *bool {
	return c.isRecurring
}

func (c *AccountTransaction) BillingFailureNextRetryDate() *time.Time {
	return c.billingFailureNextRetryDate
}

func (c *AccountTransaction) BilledAtDate() *time.Time {
	return c.billedAtDate
}

func (c *AccountTransaction) NextBillingDate() *time.Time {
	return c.nextBillingDate
}

func (c *AccountTransaction) CCBillSubscriptionId() *string {
	return c.ccbillSubscriptionId
}

func (c *AccountTransaction) MakeRefunded(timestamp time.Time, amount int64, currency Currency, reason string) error {
	c.transaction = Refund
	c.events = append(c.events, &AccountTransactionEvent{
		timestamp: timestamp,
		amount:    amount,
		currency:  currency,
		reason:    reason,
	})
	return nil
}

func (c *AccountTransaction) MakeChargeback(timestamp time.Time, amount int64, currency Currency, reason string) error {
	c.transaction = Chargeback
	c.events = append(c.events, &AccountTransactionEvent{
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

func (c *AccountTransaction) CanView(requester *principal.Principal) error {
	return requester.BelongsToAccount(c.accountId)
}

func UnmarshalAccountTransactionHistoryFromDatabase(accountId, id string, timestamp time.Time, transaction string, supportedClubId *string, paymentMethod *PaymentMethod, amount *int64, currency *string, isRecurring *bool, billingFailureNextRetryDate, billedAtDate, nextBillingDate *time.Time, ccbillSubscriptionId, ccbillReason *string) *AccountTransaction {
	tr, _ := TransactionFromString(transaction)

	var cr *Currency

	if currency != nil {
		newCr, _ := CurrencyFromString(*currency)
		cr = &newCr
	}

	return &AccountTransaction{
		accountId:                   accountId,
		id:                          id,
		timestamp:                   timestamp,
		transaction:                 tr,
		supportedClubId:             supportedClubId,
		paymentMethod:               paymentMethod,
		amount:                      amount,
		currency:                    cr,
		isRecurring:                 isRecurring,
		billingFailureNextRetryDate: billingFailureNextRetryDate,
		billedAtDate:                billedAtDate,
		nextBillingDate:             nextBillingDate,
		ccbillSubscriptionId:        ccbillSubscriptionId,
		ccbillReason:                ccbillReason,
	}
}

func CanViewAccountTransactionHistory(requester *principal.Principal, accountId string) error {
	if err := requester.BelongsToAccount(accountId); err != nil {
		return err
	}

	return nil
}
