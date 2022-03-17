package billing

import "errors"

type Transaction struct {
	slug string
}

var (
	UnknownTransaction = Transaction{""}
	Payment            = Transaction{"payment"}
	Void               = Transaction{"void"}
	Chargeback         = Transaction{"chargeback"}
	Refund             = Transaction{"refund"}
)

func (r Transaction) String() string {
	return r.slug
}

func TransactionFromString(s string) (Transaction, error) {
	switch s {
	case Payment.slug:
		return Payment, nil
	case Void.slug:
		return Void, nil
	case Chargeback.slug:
		return Chargeback, nil
	case Refund.slug:
		return Refund, nil
	}

	return UnknownTransaction, errors.New("unknown transaction: " + s)
}
