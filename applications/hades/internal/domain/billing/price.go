package billing

import (
	"overdoll/libraries/money"
)

type Price struct {
	currency money.Currency
	amount   uint64
}

func (p *Price) Currency() money.Currency {
	return p.currency
}

func (p *Price) Amount() uint64 {
	return p.amount
}

func GetDefaultPrice() *Price {
	return &Price{
		currency: money.USD,
		amount:   699,
	}
}

func UnmarshalPricingFromDatabase(currency money.Currency, amount uint64) *Price {
	return &Price{
		currency: currency,
		amount:   amount,
	}
}
