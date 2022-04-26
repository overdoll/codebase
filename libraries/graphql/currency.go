package graphql

import (
	"context"
	"fmt"
	"io"
	"overdoll/libraries/money"
	"strconv"
)

type Currency string

const (
	CurrencyUsd Currency = "USD"
	CurrencyCad Currency = "CAD"
	CurrencyAud Currency = "AUD"
	CurrencyJpy Currency = "JPY"
	CurrencyGbp Currency = "GBP"
	CurrencyEur Currency = "EUR"
)

var AllCurrency = []Currency{
	CurrencyUsd,
	CurrencyCad,
	CurrencyAud,
	CurrencyJpy,
	CurrencyGbp,
	CurrencyEur,
}

func (e Currency) IsValid() bool {
	switch e {
	case CurrencyUsd, CurrencyCad, CurrencyAud, CurrencyJpy, CurrencyGbp, CurrencyEur:
		return true
	}
	return false
}

func (e Currency) String() string {
	return string(e)
}

func (e *Currency) UnmarshalGQL(v interface{}) error {
	str, ok := v.(string)
	if !ok {
		return fmt.Errorf("enums must be strings")
	}

	*e = Currency(str)
	if !e.IsValid() {
		return fmt.Errorf("%s is not a valid Currency", str)
	}
	return nil
}

func (e Currency) MarshalGQL(w io.Writer) {
	fmt.Fprint(w, strconv.Quote(e.String()))
}

func MarshalCurrencyToGraphQL(ctx context.Context, result money.Currency) Currency {

	var currency Currency

	switch result {
	case money.USD:
		currency = CurrencyUsd
	case money.CAD:
		currency = CurrencyCad
	case money.AUD:
		currency = CurrencyAud
	case money.JPY:
		currency = CurrencyJpy
	case money.GBP:
		currency = CurrencyGbp
	case money.EUR:
		currency = CurrencyEur
	}

	return currency
}
