package payment

import (
	"overdoll/libraries/money"
)

type Balance struct {
	clubId string

	amount   int64
	currency money.Currency
}
