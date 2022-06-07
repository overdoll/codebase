package money

import (
	"overdoll/libraries/errors/domainerror"
)

type Currency struct {
	Slug string `json:"slug"`
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
	return r.Slug
}

func CurrencyFromString(s string) (Currency, error) {
	switch s {
	case USD.Slug:
		return USD, nil
	case CAD.Slug:
		return CAD, nil
	case AUD.Slug:
		return AUD, nil
	case JPY.Slug:
		return JPY, nil
	case GBP.Slug:
		return GBP, nil
	case EUR.Slug:
		return EUR, nil
	}

	return UnknownCurrency, domainerror.NewValidation("unknown currency: " + s)
}
