package billing

import "errors"

type Transaction struct {
	slug string
}

var (
	UnknownTransaction    = Transaction{""}
	ClubSupportNew        = Transaction{"club_support_new"}
	ClubSupportInvoice    = Transaction{"club_support_invoice"}
	ClubSupportVoid       = Transaction{"club_support_void"}
	ClubSupportChargeback = Transaction{"club_support_chargeback"}
	ClubSupportCancel     = Transaction{"club_support_cancel"}
	ClubSupportRefund     = Transaction{"club_support_refund"}
)

func (r Transaction) String() string {
	return r.slug
}

func TransactionFromString(s string) (Transaction, error) {
	switch s {
	case ClubSupportNew.slug:
		return ClubSupportNew, nil
	case ClubSupportInvoice.slug:
		return ClubSupportInvoice, nil
	case ClubSupportVoid.slug:
		return ClubSupportVoid, nil
	case ClubSupportChargeback.slug:
		return ClubSupportChargeback, nil
	case ClubSupportCancel.slug:
		return ClubSupportCancel, nil
	case ClubSupportRefund.slug:
		return ClubSupportRefund, nil
	}

	return UnknownTransaction, errors.New("unknown transaction: " + s)
}
