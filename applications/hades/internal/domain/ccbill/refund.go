package ccbill

import (
	"errors"
)

var (
	ErrInvalidRefundAmount = errors.New("refund amount invalid")
)

type Refund struct {
	amount         *int64
	currency       int
	subscriptionId string
}

func NewRefundWithCustomAmount(subscriptionId string, customAmount int64, actualAmount int64, currency string) (*Refund, error) {

	if customAmount > actualAmount {
		return nil, ErrInvalidRefundAmount
	}

	return &Refund{
		amount:         nil,
		subscriptionId: subscriptionId,
		currency:       currencyStringToCCBillCode[currency],
	}, nil
}

func (v *Refund) SubscriptionId() string {
	return v.subscriptionId
}

func (v *Refund) Amount() (*float64, error) {

	if v.amount == nil {
		return nil, nil
	}

	amt, err := ConvertAmountToCCBillFloat(*v.amount, v.currency)

	if err != nil {
		return nil, err
	}

	return &amt, nil
}
