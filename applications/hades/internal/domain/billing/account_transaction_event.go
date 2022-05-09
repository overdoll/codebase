package billing

import (
	"overdoll/libraries/money"
	"time"
)

type AccountTransactionEvent struct {
	id        string
	timestamp time.Time
	amount    uint64
	currency  money.Currency
	reason    string
}

func (e *AccountTransactionEvent) Id() string {
	return e.id
}

func (e *AccountTransactionEvent) Amount() uint64 {
	return e.amount
}

func (e *AccountTransactionEvent) Currency() money.Currency {
	return e.currency
}

func (e *AccountTransactionEvent) Timestamp() time.Time {
	return e.timestamp
}

func (e *AccountTransactionEvent) Reason() string {
	return e.reason
}

func UnmarshalAccountTransactionEventFromDatabase(id string, timestamp time.Time, amount uint64, currency string, reason string) *AccountTransactionEvent {
	cr, _ := money.CurrencyFromString(currency)

	return &AccountTransactionEvent{
		id:        id,
		timestamp: timestamp,
		amount:    amount,
		currency:  cr,
		reason:    reason,
	}
}
