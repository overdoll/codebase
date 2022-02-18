package billing

type RefundAmount struct {
	amount   float64
	currency Currency
}

func NewRefundAmount(amount float64, currency Currency) (*RefundAmount, error) {
	return &RefundAmount{
		amount:   amount,
		currency: currency,
	}, nil
}
