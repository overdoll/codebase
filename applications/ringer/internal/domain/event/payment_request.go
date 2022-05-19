package event

import (
	"errors"
	"overdoll/libraries/money"
	"time"
)

type PaymentRequest struct {
	isClubSupporterSubscription bool
	accountTransactionId        string
	sourceAccountId             string
	destinationClubId           string

	amount   uint64
	currency money.Currency

	timestamp time.Time

	isDeduction bool
}

func NewClubSupporterSubscriptionPaymentDepositRequest(accountTransactionId, sourceAccountId, destinationClubId string, amount uint64, currency money.Currency, timestamp time.Time) (*PaymentRequest, error) {

	if currency != money.USD {
		return nil, errors.New("deposits are only accepted in USD")
	}

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

func NewClubSupporterSubscriptionPaymentDeductionRequest(accountTransactionId, sourceAccountId, destinationClubId string, amount uint64, currency money.Currency, timestamp time.Time) (*PaymentRequest, error) {

	if currency != money.USD {
		return nil, errors.New("deductions are only accepted in USD")
	}

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

func (p *PaymentRequest) IsClubSupporterSubscription() bool {
	return p.isClubSupporterSubscription
}

func (p *PaymentRequest) AccountTransactionId() string {
	return p.accountTransactionId
}

func (p *PaymentRequest) SourceAccountId() string {
	return p.sourceAccountId
}

func (p *PaymentRequest) DestinationClubId() string {
	return p.destinationClubId
}

func (p *PaymentRequest) Amount() uint64 {
	return p.amount
}

func (p *PaymentRequest) Currency() money.Currency {
	return p.currency
}

func (p *PaymentRequest) Timestamp() time.Time {
	return p.timestamp
}

func (p *PaymentRequest) IsDeduction() bool {
	return p.isDeduction
}
