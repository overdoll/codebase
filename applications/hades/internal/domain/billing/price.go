package billing

import "overdoll/libraries/money"

type Price struct {
	currency money.Currency
	amount   int64
}

func (p *Price) Currency() money.Currency {
	return p.currency
}

func (p *Price) Amount() int64 {
	return p.amount
}

func UnmarshalPricingFromDatabase(currency money.Currency, amount int64) *Price {
	return &Price{
		currency: currency,
		amount:   amount,
	}
}
