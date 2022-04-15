package payment

import (
	"overdoll/libraries/money"
	"time"
)

type ClubPayment struct {
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

func NewClubSupporterSubscriptionPendingPaymentDeduction(existingPayment *ClubPayment, id, accountTransactionId, sourceAccountId, destinationClubId string, amount int64, currency money.Currency, timestamp time.Time) (*ClubPayment, error) {
	// get percent of original platform fee
	platformFee, err := NewPlatformFeeFromAmountAndFinalAmount(destinationClubId, existingPayment.baseAmount, existingPayment.finalAmount)

	if err != nil {
		return nil, err
	}

	amt := platformFee.CalculateAmountAfterFee(amount)
	fee := platformFee.CalculateFee(amount)

	settlementDate := timestamp.Add(time.Hour * 24 * 14)
	existingId := existingPayment.id

	return &ClubPayment{
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

func NewClubSupporterSubscriptionPendingPaymentDeposit(platformFee *PlatformFee, id, accountTransactionId, sourceAccountId, destinationClubId string, amount int64, currency money.Currency, timestamp time.Time) (*ClubPayment, error) {

	amt := platformFee.CalculateAmountAfterFee(amount)
	fee := platformFee.CalculateFee(amount)
	settlementDate := timestamp.Add(time.Hour * 24 * 14)

	return &ClubPayment{
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

func (p *ClubPayment) Id() string {
	return p.id
}

func (p *ClubPayment) Source() Source {
	return p.source
}

func (p *ClubPayment) Status() Status {
	return p.status
}

func (p *ClubPayment) SourceAccountId() string {
	return p.sourceAccountId
}

func (p *ClubPayment) AccountTransactionId() string {
	return p.accountTransactionId
}

func (p *ClubPayment) DestinationClubId() string {
	return p.destinationClubId
}

func (p *ClubPayment) BaseAmount() int64 {
	return p.baseAmount
}

func (p *ClubPayment) BaseCurrency() money.Currency {
	return p.baseCurrency
}

func (p *ClubPayment) PlatformFeeAmount() int64 {
	return p.platformFeeAmount
}

func (p *ClubPayment) FinalAmount() int64 {
	return p.finalAmount
}

func (p *ClubPayment) IsDeduction() bool {
	return p.isDeduction
}

func (p *ClubPayment) DeductionSourcePaymentId() *string {
	return p.deductionSourcePaymentId
}

func (p *ClubPayment) Timestamp() time.Time {
	return p.timestamp
}

func (p *ClubPayment) SettlementDate() time.Time {
	return p.settlementDate
}

func (p *ClubPayment) MakeReady() error {
	p.status = Ready
	return nil
}
