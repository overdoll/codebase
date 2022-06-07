package billing

import (
	"overdoll/libraries/errors/domainerror"
)

type Transaction struct {
	slug string
}

var (
	UnknownTransaction = Transaction{""}
	Payment            = Transaction{"PAYMENT"}
	Void               = Transaction{"VOID"}
	Chargeback         = Transaction{"CHARGEBACK"}
	Refund             = Transaction{"REFUND"}
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

	return UnknownTransaction, domainerror.NewValidation("unknown transaction: " + s)
}
