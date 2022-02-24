package billing

type Price struct {
	currency Currency
	amount   float64
}

func (p *Price) Currency() Currency {
	return p.currency
}

func (p *Price) Amount() float64 {
	return p.amount
}

func UnmarshalPricingFromDatabase(currency Currency, amount float64) *Price {
	return &Price{
		currency: currency,
		amount:   amount,
	}
}
