package billing

type Price struct {
	currency Currency
	amount   int64
}

func (p *Price) Currency() Currency {
	return p.currency
}

func (p *Price) Amount() int64 {
	return p.amount
}

func UnmarshalPricingFromDatabase(currency Currency, amount int64) *Price {
	return &Price{
		currency: currency,
		amount:   amount,
	}
}
