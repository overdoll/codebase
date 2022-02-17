package billing

import (
	"github.com/segmentio/ksuid"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
	"time"
)

type AccountTransactionHistory struct {
	*paging.Node

	accountId string
	id        string

	timestamp time.Time

	transaction Transaction

	supportedClubId *string

	paymentMethod *PaymentMethod

	amount   *float64
	currency *Currency

	isRecurring *bool

	billingFailureNextRetryDate *time.Time

	billedAtDate    *time.Time
	nextBillingDate *time.Time

	ccbillSubscriptionId string
	ccbillTransactionId  *string

	ccbillErrorText *string
	ccbillErrorCode *string
	ccbillReason    *string
}

func NewReactivatedClubSubscriptionAccountTransactionFromCCBill(accountId, clubId, ccbillSubscriptionId, ccbillTransactionId string, timestamp, nextBillingDate time.Time) (*AccountTransactionHistory, error) {
	return &AccountTransactionHistory{
		accountId:            accountId,
		id:                   ccbillTransactionId,
		timestamp:            timestamp,
		transaction:          Reactivate,
		supportedClubId:      &clubId,
		ccbillTransactionId:  &ccbillTransactionId,
		ccbillSubscriptionId: ccbillSubscriptionId,
		nextBillingDate:      &nextBillingDate,
	}, nil
}

func NewFailedClubSubscriptionAccountTransactionFromCCBill(accountId, clubId, ccbillSubscriptionId string, timestamp, nextRetryDate time.Time, failureReason, failureCode string) (*AccountTransactionHistory, error) {
	return &AccountTransactionHistory{
		accountId:                   accountId,
		id:                          ksuid.New().String(),
		timestamp:                   timestamp,
		billingFailureNextRetryDate: &nextRetryDate,
		ccbillErrorText:             &failureReason,
		ccbillErrorCode:             &failureCode,
		transaction:                 Failed,
		supportedClubId:             &clubId,
		ccbillSubscriptionId:        ccbillSubscriptionId,
	}, nil
}

func NewExpiredClubSubscriptionAccountTransactionFromCCBill(accountId, clubId, ccbillSubscriptionId string, timestamp time.Time) (*AccountTransactionHistory, error) {

	return &AccountTransactionHistory{
		accountId:            accountId,
		id:                   ksuid.New().String(),
		timestamp:            timestamp,
		transaction:          Expired,
		supportedClubId:      &clubId,
		ccbillSubscriptionId: ccbillSubscriptionId,
	}, nil
}

func NewRefundClubSubscriptionAccountTransactionFromCCBill(accountId, clubId, ccbillSubscriptionId, ccbillTransactionId string, timestamp time.Time, amount float64, currency, reason string, paymentMethod *PaymentMethod) (*AccountTransactionHistory, error) {

	cr, err := CurrencyFromString(currency)

	if err != nil {
		return nil, err
	}

	return &AccountTransactionHistory{
		accountId:            accountId,
		id:                   ccbillTransactionId,
		timestamp:            timestamp,
		transaction:          Refund,
		supportedClubId:      &clubId,
		amount:               &amount,
		ccbillReason:         &reason,
		currency:             &cr,
		paymentMethod:        paymentMethod,
		ccbillSubscriptionId: ccbillSubscriptionId,
		ccbillTransactionId:  &ccbillTransactionId,
	}, nil
}

func NewVoidClubSubscriptionAccountTransactionFromCCBill(accountId, clubId, ccbillSubscriptionId, ccbillTransactionId string, timestamp time.Time, amount float64, currency, reason string) (*AccountTransactionHistory, error) {

	cr, err := CurrencyFromString(currency)

	if err != nil {
		return nil, err
	}

	return &AccountTransactionHistory{
		accountId:            accountId,
		id:                   ccbillTransactionId,
		timestamp:            timestamp,
		transaction:          Void,
		supportedClubId:      &clubId,
		amount:               &amount,
		ccbillReason:         &reason,
		currency:             &cr,
		ccbillSubscriptionId: ccbillSubscriptionId,
		ccbillTransactionId:  &ccbillTransactionId,
	}, nil
}

func NewInvoiceClubSubscriptionAccountTransactionFromCCBill(accountId, clubId, ccbillSubscriptionId, ccbillTransactionId string, timestamp, billedAtDate, nextBillingDate time.Time, amount float64, currency string, paymentMethod *PaymentMethod) (*AccountTransactionHistory, error) {

	cr, err := CurrencyFromString(currency)

	if err != nil {
		return nil, err
	}

	return &AccountTransactionHistory{
		accountId:            accountId,
		id:                   ksuid.New().String(),
		timestamp:            timestamp,
		transaction:          Invoice,
		supportedClubId:      &clubId,
		amount:               &amount,
		billedAtDate:         &billedAtDate,
		nextBillingDate:      &nextBillingDate,
		currency:             &cr,
		paymentMethod:        paymentMethod,
		ccbillSubscriptionId: ccbillSubscriptionId,
		ccbillTransactionId:  &ccbillTransactionId,
	}, nil
}

func NewNewClubSubscriptionAccountTransactionFromCCBill(accountId, clubId, ccbillSubscriptionId, ccbillTransactionId string, timestamp, billedAtDate, nextBillingDate time.Time, amount float64, currency string) (*AccountTransactionHistory, error) {

	cr, err := CurrencyFromString(currency)

	if err != nil {
		return nil, err
	}

	return &AccountTransactionHistory{
		accountId:            accountId,
		id:                   ccbillTransactionId,
		timestamp:            timestamp,
		transaction:          New,
		supportedClubId:      &clubId,
		amount:               &amount,
		billedAtDate:         &billedAtDate,
		nextBillingDate:      &nextBillingDate,
		currency:             &cr,
		ccbillSubscriptionId: ccbillSubscriptionId,
		ccbillTransactionId:  &ccbillTransactionId,
	}, nil
}

func NewChargebackClubSubscriptionAccountTransactionFromCCBill(accountId, clubId, ccbillSubscriptionId, ccbillTransactionId string, timestamp time.Time, reason string, amount float64, currency string, paymentMethod *PaymentMethod) (*AccountTransactionHistory, error) {

	cr, err := CurrencyFromString(currency)

	if err != nil {
		return nil, err
	}

	return &AccountTransactionHistory{
		accountId:            accountId,
		id:                   ccbillTransactionId,
		timestamp:            timestamp,
		transaction:          Chargeback,
		supportedClubId:      &clubId,
		amount:               &amount,
		currency:             &cr,
		paymentMethod:        paymentMethod,
		ccbillSubscriptionId: ccbillSubscriptionId,
		ccbillTransactionId:  &ccbillTransactionId,
		ccbillReason:         &reason,
	}, nil
}

func NewCancelledClubSubscriptionAccountTransactionFromCCBill(accountId, clubId, ccbillSubscriptionId string, timestamp time.Time, reason string) (*AccountTransactionHistory, error) {
	return &AccountTransactionHistory{
		accountId:            accountId,
		id:                   ksuid.New().String(),
		timestamp:            timestamp,
		transaction:          Cancel,
		supportedClubId:      &clubId,
		ccbillSubscriptionId: ccbillSubscriptionId,
		ccbillReason:         &reason,
	}, nil
}

func (c *AccountTransactionHistory) AccountId() string {
	return c.accountId
}

func (c *AccountTransactionHistory) Id() string {
	return c.id
}

func (c *AccountTransactionHistory) Timestamp() time.Time {
	return c.timestamp
}

func (c *AccountTransactionHistory) Transaction() Transaction {
	return c.transaction
}

func (c *AccountTransactionHistory) SupportedClubId() *string {
	return c.supportedClubId
}

func (c *AccountTransactionHistory) PaymentMethod() *PaymentMethod {
	return c.paymentMethod
}

func (c *AccountTransactionHistory) Amount() *float64 {
	return c.amount
}

func (c *AccountTransactionHistory) Currency() *Currency {
	return c.currency
}

func (c *AccountTransactionHistory) IsRecurring() *bool {
	return c.isRecurring
}

func (c *AccountTransactionHistory) BillingFailureNextRetryDate() *time.Time {
	return c.billingFailureNextRetryDate
}

func (c *AccountTransactionHistory) BilledAtDate() *time.Time {
	return c.billedAtDate
}

func (c *AccountTransactionHistory) NextBillingDate() *time.Time {
	return c.nextBillingDate
}

func (c *AccountTransactionHistory) CCBillSubscriptionId() string {
	return c.ccbillSubscriptionId
}

func (c *AccountTransactionHistory) CCBillTransactionId() *string {
	return c.ccbillTransactionId
}

func (c *AccountTransactionHistory) CCBillErrorText() *string {
	return c.ccbillErrorText
}

func (c *AccountTransactionHistory) CCBillErrorCode() *string {
	return c.ccbillErrorCode
}

func (c *AccountTransactionHistory) CCBillReason() *string {
	return c.ccbillReason
}

func UnmarshalAccountTransactionHistoryFromDatabase(accountId, id string, timestamp time.Time, transaction string, supportedClubId *string, paymentMethod *PaymentMethod, amount *float64, currency *string, isRecurring *bool, billingFailureNextRetryDate, billedAtDate, nextBillingDate *time.Time, ccbillSubscriptionId string, ccbillTransactionId, ccbillErrorText, ccbillErrorCode, ccbillReason *string) *AccountTransactionHistory {
	tr, _ := TransactionFromString(transaction)

	var cr *Currency

	if currency != nil {
		newCr, _ := CurrencyFromString(*currency)
		cr = &newCr
	}

	return &AccountTransactionHistory{
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
		ccbillErrorText:             ccbillErrorText,
		ccbillErrorCode:             ccbillErrorCode,
		ccbillReason:                ccbillReason,
	}
}

func CanViewAccountTransactionHistory(requester *principal.Principal, accountId string) error {
	if err := requester.BelongsToAccount(accountId); err != nil {
		return err
	}

	return nil
}
