package billing

import "errors"

type Transaction struct {
	slug string
}

var (
	UnknownTransaction = Transaction{""}
	New                = Transaction{"new"}
	Invoice            = Transaction{"invoice"}
	Void               = Transaction{"void"}
	Chargeback         = Transaction{"chargeback"}
	Cancel             = Transaction{"cancel"}
	Expired            = Transaction{"expired"}
	Refund             = Transaction{"refund"}
	Failed             = Transaction{"failed"}
	Reactivate         = Transaction{"reactivate"}
)

func (r Transaction) String() string {
	return r.slug
}

func TransactionFromString(s string) (Transaction, error) {
	switch s {
	case New.slug:
		return New, nil
	case Invoice.slug:
		return Invoice, nil
	case Void.slug:
		return Void, nil
	case Chargeback.slug:
		return Chargeback, nil
	case Failed.slug:
		return Failed, nil
	case Cancel.slug:
		return Cancel, nil
	case Expired.slug:
		return Expired, nil
	case Refund.slug:
		return Refund, nil
	case Reactivate.slug:
		return Reactivate, nil
	}

	return UnknownTransaction, errors.New("unknown transaction: " + s)
}
