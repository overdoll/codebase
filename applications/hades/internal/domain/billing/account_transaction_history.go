package billing

import "time"

type AccountTransactionHistory struct {
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
	ccbillErrorText      *string
	ccbillErrorCode      *string
	ccbillReason         *string
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

func (c *AccountTransactionHistory) CCBillErrorText() *string {
	return c.ccbillErrorText
}

func (c *AccountTransactionHistory) CCBillErrorCode() *string {
	return c.ccbillErrorCode
}

func (c *AccountTransactionHistory) CCBillReason() *string {
	return c.ccbillReason
}

func UnmarshalAccountTransactionHistoryFromDatabase(accountId, id string, timestamp time.Time, transaction string, supportedClubId *string, paymentMethod *PaymentMethod, amount *float64, currency *string, isRecurring *bool, billingFailureNextRetryDate, billedAtDate, nextBillingDate *time.Time, ccbillSubscriptionId string, ccbillErrorText, ccbillErrorCode, ccbillReason *string) *AccountTransactionHistory {
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
