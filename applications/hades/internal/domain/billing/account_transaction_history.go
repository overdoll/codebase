package billing

import (
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
	"overdoll/libraries/uuid"
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

	amount   *int64
	currency *Currency

	isRecurring *bool

	billingFailureNextRetryDate *time.Time

	billedAtDate    *time.Time
	nextBillingDate *time.Time

	ccbillSubscriptionId *string

	ccbillErrorText *string
	ccbillErrorCode *string
	ccbillReason    *string
}

func NewReactivatedClubSubscriptionAccountTransaction(accountId, clubId string, ccbillSubscriptionId *string, timestamp, nextBillingDate time.Time) (*AccountTransactionHistory, error) {
	k, err := uuid.NewRandomWithTime(timestamp)
	if err != nil {
		return nil, err
	}
	return &AccountTransactionHistory{
		accountId:            accountId,
		id:                   k.String(),
		timestamp:            timestamp,
		transaction:          Reactivate,
		supportedClubId:      &clubId,
		ccbillSubscriptionId: ccbillSubscriptionId,
		nextBillingDate:      &nextBillingDate,
	}, nil
}

func NewFailedClubSubscriptionAccountTransaction(accountId, clubId string, ccbillSubscriptionId *string, timestamp, nextRetryDate time.Time, failureReason, failureCode string) (*AccountTransactionHistory, error) {
	k, err := uuid.NewRandomWithTime(timestamp)
	if err != nil {
		return nil, err
	}
	return &AccountTransactionHistory{
		accountId:                   accountId,
		id:                          k.String(),
		timestamp:                   timestamp,
		billingFailureNextRetryDate: &nextRetryDate,
		ccbillErrorText:             &failureReason,
		ccbillErrorCode:             &failureCode,
		transaction:                 Failed,
		supportedClubId:             &clubId,
		ccbillSubscriptionId:        ccbillSubscriptionId,
	}, nil
}

func NewExpiredClubSubscriptionAccountTransaction(accountId, clubId string, ccbillSubscriptionId *string, timestamp time.Time) (*AccountTransactionHistory, error) {
	k, err := uuid.NewRandomWithTime(timestamp)
	if err != nil {
		return nil, err
	}
	return &AccountTransactionHistory{
		accountId:            accountId,
		id:                   k.String(),
		timestamp:            timestamp,
		transaction:          Expired,
		supportedClubId:      &clubId,
		ccbillSubscriptionId: ccbillSubscriptionId,
	}, nil
}

func NewRefundClubSubscriptionAccountTransaction(accountId, clubId string, ccbillSubscriptionId *string, timestamp time.Time, amount int64, currency, reason string, paymentMethod *PaymentMethod) (*AccountTransactionHistory, error) {
	k, err := uuid.NewRandomWithTime(timestamp)
	if err != nil {
		return nil, err
	}

	cr, err := CurrencyFromString(currency)

	if err != nil {
		return nil, err
	}

	return &AccountTransactionHistory{
		accountId:            accountId,
		id:                   k.String(),
		timestamp:            timestamp,
		transaction:          Refund,
		supportedClubId:      &clubId,
		amount:               &amount,
		ccbillReason:         &reason,
		currency:             &cr,
		paymentMethod:        paymentMethod,
		ccbillSubscriptionId: ccbillSubscriptionId,
	}, nil
}

func NewVoidClubSubscriptionAccountTransaction(accountId, clubId string, ccbillSubscriptionId *string, timestamp time.Time, amount int64, currency, reason string) (*AccountTransactionHistory, error) {
	k, err := uuid.NewRandomWithTime(timestamp)
	if err != nil {
		return nil, err
	}

	cr, err := CurrencyFromString(currency)

	if err != nil {
		return nil, err
	}

	return &AccountTransactionHistory{
		accountId:            accountId,
		id:                   k.String(),
		timestamp:            timestamp,
		transaction:          Void,
		supportedClubId:      &clubId,
		amount:               &amount,
		ccbillReason:         &reason,
		currency:             &cr,
		ccbillSubscriptionId: ccbillSubscriptionId,
	}, nil
}

func NewInvoiceClubSubscriptionAccountTransaction(accountId, clubId string, ccbillSubscriptionId *string, timestamp, billedAtDate, nextBillingDate time.Time, amount int64, currency string, paymentMethod *PaymentMethod) (*AccountTransactionHistory, error) {
	k, err := uuid.NewRandomWithTime(timestamp)
	if err != nil {
		return nil, err
	}

	cr, err := CurrencyFromString(currency)

	if err != nil {
		return nil, err
	}

	return &AccountTransactionHistory{
		accountId:            accountId,
		id:                   k.String(),
		timestamp:            timestamp,
		transaction:          Invoice,
		supportedClubId:      &clubId,
		amount:               &amount,
		billedAtDate:         &billedAtDate,
		nextBillingDate:      &nextBillingDate,
		currency:             &cr,
		paymentMethod:        paymentMethod,
		ccbillSubscriptionId: ccbillSubscriptionId,
	}, nil
}

func NewNewClubSubscriptionAccountTransaction(accountId, clubId string, ccbillSubscriptionId *string, timestamp, billedAtDate, nextBillingDate time.Time, amount int64, currency string) (*AccountTransactionHistory, error) {
	k, err := uuid.NewRandomWithTime(timestamp)
	if err != nil {
		return nil, err
	}

	cr, err := CurrencyFromString(currency)

	if err != nil {
		return nil, err
	}

	return &AccountTransactionHistory{
		accountId:            accountId,
		id:                   k.String(),
		timestamp:            timestamp,
		transaction:          New,
		supportedClubId:      &clubId,
		amount:               &amount,
		billedAtDate:         &billedAtDate,
		nextBillingDate:      &nextBillingDate,
		currency:             &cr,
		ccbillSubscriptionId: ccbillSubscriptionId,
	}, nil
}

func NewChargebackClubSubscriptionAccountTransaction(accountId, clubId string, ccbillSubscriptionId *string, timestamp time.Time, reason string, amount int64, currency string, paymentMethod *PaymentMethod) (*AccountTransactionHistory, error) {
	k, err := uuid.NewRandomWithTime(timestamp)
	if err != nil {
		return nil, err
	}

	cr, err := CurrencyFromString(currency)

	if err != nil {
		return nil, err
	}

	return &AccountTransactionHistory{
		accountId:            accountId,
		id:                   k.String(),
		timestamp:            timestamp,
		transaction:          Chargeback,
		supportedClubId:      &clubId,
		amount:               &amount,
		currency:             &cr,
		paymentMethod:        paymentMethod,
		ccbillSubscriptionId: ccbillSubscriptionId,
		ccbillReason:         &reason,
	}, nil
}

func NewCancelledClubSubscriptionAccountTransaction(accountId, clubId string, ccbillSubscriptionId *string, timestamp time.Time, reason string) (*AccountTransactionHistory, error) {
	k, err := uuid.NewRandomWithTime(timestamp)
	if err != nil {
		return nil, err
	}

	return &AccountTransactionHistory{
		accountId:            accountId,
		id:                   k.String(),
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

func (c *AccountTransactionHistory) Amount() *int64 {
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

func (c *AccountTransactionHistory) CCBillSubscriptionId() *string {
	return c.ccbillSubscriptionId
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

func (c *AccountTransactionHistory) CanView(requester *principal.Principal) error {
	return requester.BelongsToAccount(c.accountId)
}

func UnmarshalAccountTransactionHistoryFromDatabase(accountId, id string, timestamp time.Time, transaction string, supportedClubId *string, paymentMethod *PaymentMethod, amount *int64, currency *string, isRecurring *bool, billingFailureNextRetryDate, billedAtDate, nextBillingDate *time.Time, ccbillSubscriptionId, ccbillErrorText, ccbillErrorCode, ccbillReason *string) *AccountTransactionHistory {
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
