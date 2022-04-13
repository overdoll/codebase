package payment

import (
	"overdoll/libraries/money"
	"time"
)

type Payment struct {
	id                   string
	source               Source
	status               Status
	sourceAccountId      string
	accountTransactionId string
	destinationClubId    string

	baseAmount   int64
	baseCurrency money.Currency

	platformFeeAmount int64

	finalAmount int64

	isDeduction              bool
	deductionSourcePaymentId *string

	timestamp      time.Time
	settlementDate time.Time
}

func NewClubSupporterSubscriptionPendingPaymentDeduction(existingPayment *Payment, id, accountTransactionId, sourceAccountId, destinationClubId string, amount int64, currency money.Currency, timestamp time.Time) (*Payment, error) {
	// get percent of original platform fee
	platformFee, err := NewPlatformFeeFromAmountAndFinalAmount(destinationClubId, existingPayment.baseAmount, existingPayment.finalAmount)

	if err != nil {
		return nil, err
	}

	amt := platformFee.CalculateAmountAfterFee(amount)
	fee := platformFee.CalculateFee(amount)

	settlementDate := timestamp.Add(time.Hour * 24 * 14)
	existingId := existingPayment.id

	return &Payment{
		id:                       id,
		source:                   ClubSupporterSubscription,
		status:                   Pending,
		sourceAccountId:          sourceAccountId,
		destinationClubId:        destinationClubId,
		accountTransactionId:     accountTransactionId,
		baseAmount:               amount,
		baseCurrency:             currency,
		platformFeeAmount:        fee,
		finalAmount:              amt,
		isDeduction:              true,
		deductionSourcePaymentId: &existingId,
		timestamp:                timestamp,
		settlementDate:           settlementDate,
	}, nil
}

func NewClubSupporterSubscriptionPendingPaymentDeposit(platformFee *PlatformFee, id, accountTransactionId, sourceAccountId, destinationClubId string, amount int64, currency money.Currency, timestamp time.Time) (*Payment, error) {

	amt := platformFee.CalculateAmountAfterFee(amount)
	fee := platformFee.CalculateFee(amount)
	settlementDate := timestamp.Add(time.Hour * 24 * 14)

	return &Payment{
		id:                       id,
		source:                   ClubSupporterSubscription,
		status:                   Pending,
		sourceAccountId:          sourceAccountId,
		destinationClubId:        destinationClubId,
		accountTransactionId:     accountTransactionId,
		baseAmount:               amount,
		baseCurrency:             currency,
		platformFeeAmount:        fee,
		finalAmount:              amt,
		isDeduction:              false,
		deductionSourcePaymentId: nil,
		timestamp:                timestamp,
		settlementDate:           settlementDate,
	}, nil
}

func (p *Payment) Id() string {
	return p.id
}

func (p *Payment) Source() Source {
	return p.source
}

func (p *Payment) Status() Status {
	return p.status
}

func (p *Payment) SourceAccountId() string {
	return p.sourceAccountId
}

func (p *Payment) AccountTransactionId() string {
	return p.accountTransactionId
}

func (p *Payment) DestinationClubId() string {
	return p.destinationClubId
}

func (p *Payment) BaseAmount() int64 {
	return p.baseAmount
}

func (p *Payment) BaseCurrency() money.Currency {
	return p.baseCurrency
}

func (p *Payment) PlatformFeeAmount() int64 {
	return p.platformFeeAmount
}

func (p *Payment) FinalAmount() int64 {
	return p.finalAmount
}

func (p *Payment) IsDeduction() bool {
	return p.isDeduction
}

func (p *Payment) DeductionSourcePaymentId() *string {
	return p.deductionSourcePaymentId
}

func (p *Payment) Timestamp() time.Time {
	return p.timestamp
}

func (p *Payment) SettlementDate() time.Time {
	return p.settlementDate
}

func (p *Payment) MakeReady() error {
	p.status = Ready
	return nil
}
