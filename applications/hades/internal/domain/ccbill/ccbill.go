package ccbill

const (
	// initial period (days)
	ccbillInitialPeriod = 30

	// recurring period (days)
	ccbillRecurringPeriod = 30

	// indefinite rebills
	ccbillNumRebills = 99
)

var (
	currencyStringToCCBillCode = map[string]int{
		"USD": 840,
		"EUR": 978,
		"AUD": 036,
		"CAD": 124,
		"GBP": 826,
		"JPY": 392,
	}
)
