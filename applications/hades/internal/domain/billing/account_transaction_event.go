package billing

import "time"

type AccountTransactionEvent struct {
	timestamp time.Time
	amount    int64
	currency  Currency
	reason    string
}
