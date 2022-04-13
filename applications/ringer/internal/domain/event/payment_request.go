package event

import (
	"overdoll/libraries/money"
	"time"
)

type PaymentRequest struct {
	isClubSupporterSubscription bool
	accountTransactionId        string
	sourceAccountId             string
	destinationClubId           string

	amount   int64
	currency money.Currency

	timestamp time.Time

	isDeduction bool
}

func NewClubSupporterSubscriptionPaymentDepositRequest(accountTransactionId, sourceAccountId, destinationClubId string, amount int64, currency money.Currency, timestamp time.Time) (*PaymentRequest, error) {
	return &PaymentRequest{
		isClubSupporterSubscription: true,
		accountTransactionId:        accountTransactionId,
		sourceAccountId:             sourceAccountId,
		destinationClubId:           destinationClubId,
		amount:                      amount,
		currency:                    currency,
		timestamp:                   timestamp,
	}, nil
}

func NewClubSupporterSubscriptionPaymentDeductionRequest(accountTransactionId, sourceAccountId, destinationClubId string, amount int64, currency money.Currency, timestamp time.Time) (*PaymentRequest, error) {
	return &PaymentRequest{
		isClubSupporterSubscription: true,
		accountTransactionId:        accountTransactionId,
		sourceAccountId:             sourceAccountId,
		destinationClubId:           destinationClubId,
		amount:                      amount,
		currency:                    currency,
		timestamp:                   timestamp,
		isDeduction:                 true,
	}, nil
}
