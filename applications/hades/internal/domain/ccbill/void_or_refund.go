package ccbill

type VoidOrRefund struct {
	amount         *float64
	subscriptionId string
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
