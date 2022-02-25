package ccbill

import (
	"errors"
)

type VoidOrRefund struct {
	amount         *float64
	subscriptionId string
}

func NewVoidOrRefundWithCustomAmount(subscriptionId string, customAmount float64, actualAmount float64) (*VoidOrRefund, error) {

	if customAmount > actualAmount {
		return nil, errors.New("refund amount too high")
	}

	return &VoidOrRefund{
		amount:         nil,
		subscriptionId: subscriptionId,
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

func (v *VoidOrRefund) Amount() *float64 {
	return v.amount
}
