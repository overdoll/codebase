package ccbill

import "time"

type VoidOrRefund struct {
	amount         *float64
	subscriptionId string
}

func CalculateProratedRefundAmount(originalAmount float64, lastBillingDate time.Time, nextBillingDate time.Time) float64 {
	return 0.0
}

func NewVoidOrRefundWithCustomAmount(subscriptionId string, customAmount *float64, actualAmount float64, lastBillingDate time.Time, nextBillingDate time.Time) (*VoidOrRefund, error) {
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
