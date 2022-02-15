package billing

import "time"

type AccountTransactionHistory struct {
	accountId string
	bucket    string
	id        string

	timestamp time.Time

	transaction Transaction

	supportedClubId *string

	paymentMethod *PaymentMethod

	amount   float64
	currency Currency

	isRecurring *bool

	billingFailureNextRetryDate *time.Time

	billedAtDate    *time.Time
	nextBillingDate *time.Time

	ccbillSubscriptionId string
	ccbillErrorText      string
	ccbillErrorCode      string
	ccbillReason         string
}
