package billing

import "time"

type AccountTransactionEvent struct {
	id        string
	timestamp time.Time
	amount    int64
	currency  Currency
	reason    string
}

func (e *AccountTransactionEvent) Amount() int64 {
	return e.amount
}

func (e *AccountTransactionEvent) Currency() Currency {
	return e.currency
}
