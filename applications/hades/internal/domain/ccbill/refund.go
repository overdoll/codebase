package ccbill

import (
	"errors"
)

var (
	ErrInvalidRefundAmount = errors.New("refund amount invalid")
)

type Refund struct {
	amount        *int64
	currency      int
	transactionId string
}

func NewRefundWithCustomAmount(transactionId string, customAmount int64, actualAmount int64, currency string) (*Refund, error) {

	if customAmount > actualAmount {
		return nil, ErrInvalidRefundAmount
	}

	return &Refund{
		amount:        nil,
		transactionId: transactionId,
		currency:      currencyStringToCCBillCode[currency],
	}, nil
}

func (v *Refund) TransactionId() string {
	return v.transactionId
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
