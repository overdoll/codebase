package ccbill

import (
	"errors"
)

var (
	ErrInvalidRefundAmount = errors.New("refund amount invalid")
)

type VoidOrRefund struct {
	amount         *int64
	currency       int
	subscriptionId string
}

func NewVoidOrRefundWithCustomAmount(subscriptionId string, customAmount int64, actualAmount int64, currency string) (*VoidOrRefund, error) {

	if customAmount > actualAmount {
		return nil, ErrInvalidRefundAmount
	}

	return &VoidOrRefund{
		amount:         nil,
		subscriptionId: subscriptionId,
		currency:       currencyStringToCCBillCode[currency],
	}, nil
}

func NewVoidOrRefundWithoutAmount(subscriptionId string) (*VoidOrRefund, error) {
	return &VoidOrRefund{
		amount:         nil,
		subscriptionId: subscriptionId,
	}, nil
}

func (v *VoidOrRefund) SubscriptionId() string {
	return v.subscriptionId
}

func (v *VoidOrRefund) Amount() (*float64, error) {

	if v.amount == nil {
		return nil, nil
	}

	amt, err := ConvertAmountToCCBillFloat(*v.amount, v.currency)

	if err != nil {
		return nil, err
	}

	return &amt, nil
}
