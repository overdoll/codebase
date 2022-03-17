package billing

import "time"

type AccountTransactionEvent struct {
	id        string
	timestamp time.Time
	amount    int64
	currency  Currency
	reason    string
}

func (e *AccountTransactionEvent) Id() string {
	return e.id
}

func (e *AccountTransactionEvent) Amount() int64 {
	return e.amount
}

func (e *AccountTransactionEvent) Currency() Currency {
	return e.currency
}

func (e *AccountTransactionEvent) Timestamp() time.Time {
	return e.timestamp
}

func (e *AccountTransactionEvent) Reason() string {
	return e.reason
}

func UnmarshalAccountTransactionEventFromDatabase(id string, timestamp time.Time, amount int64, currency string, reason string) *AccountTransactionEvent {
	cr, _ := CurrencyFromString(currency)
	return &AccountTransactionEvent{
		id:        id,
		timestamp: timestamp,
		amount:    amount,
		currency:  cr,
		reason:    reason,
	}
}
