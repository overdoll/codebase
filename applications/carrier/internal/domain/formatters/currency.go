package formatters

import (
	"fmt"
)

func parseCurrencyAmount(amount uint64, currency string) (float64, error) {
	switch currency {
	case "USD":
		fallthrough
	case "AUD":
		fallthrough
	case "CAD":
		fallthrough
	case "GBP":
		fallthrough
	case "EUR":
		return float64(amount) / 100, nil
	case "JPY":
		return float64(amount), nil
	}

	return 0, fmt.Errorf("invalid currency passed: %s", currency)
}

func Currency(amount uint64, currency string) (*string, error) {
	amt, err := parseCurrencyAmount(amount, currency)

	if err != nil {
		return nil, err
	}

	finalText := fmt.Sprintf("%.2f", amt) + " " + currency

	return &finalText, nil
}
