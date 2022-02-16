package billing

import "errors"

type Currency struct {
	slug string
}

var (
	UnknownCurrency = Currency{""}
	USD             = Currency{"USD"}
	CAD             = Currency{"CAD"}
	AUD             = Currency{"AUD"}
	JPY             = Currency{"JPY"}
	GBP             = Currency{"GBP"}
	EUR             = Currency{"EUR"}
)

func (r Currency) String() string {
	return r.slug
}

func CurrencyFromString(s string) (Currency, error) {
	switch s {
	case USD.slug:
		return USD, nil
	case CAD.slug:
		return CAD, nil
	case AUD.slug:
		return AUD, nil
	case JPY.slug:
		return JPY, nil
	case GBP.slug:
		return GBP, nil
	case EUR.slug:
		return EUR, nil
	}

	return UnknownCurrency, errors.New("unknown currency: " + s)
}
