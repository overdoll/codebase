package billing

import (
	"golang.org/x/text/currency"
	"golang.org/x/text/language"
	"math"
	"overdoll/libraries/location"
	"overdoll/libraries/money"
)

var (
	clubSupporterPricingRatios = map[money.Currency]float64{
		money.USD: 1,
		money.CAD: 1.40,
		money.AUD: 1.62,
		// for JPY that is in absolute value, need to remember to use the proper base price of 699 instead of 6.99 since it doesn't convert
		money.JPY: 1.50,
		money.GBP: 0.92,
		money.EUR: 1.04,
	}
)

func getRoundedPriceInInteger(price float64) uint64 {
	return uint64(math.Round(price))
}

func GetClubSupporterLocalizedPricingDetails(location *location.Location, price *Price) (*Price, error) {

	// blank country, make sure it works
	country := location.Country()

	if country == "" {
		country = "US"
	}

	region, err := language.ParseRegion(country)

	if err != nil {
		return nil, err
	}

	curr, ok := currency.FromRegion(region)

	if !ok {
		return UnmarshalPricingFromDatabase(money.USD, getRoundedPriceInInteger(clubSupporterPricingRatios[money.USD]*float64(price.Amount()))), nil
	}

	newCurrency, err := money.CurrencyFromString(curr.String())

	// ignore unknown currency errors
	if err != nil {
		newCurrency = money.USD
	}

	return UnmarshalPricingFromDatabase(newCurrency, getRoundedPriceInInteger(clubSupporterPricingRatios[newCurrency]*float64(price.Amount()))), nil
}

func GetClubSupporterPricingForCurrency(currency money.Currency, price *Price) (*Price, error) {
	return UnmarshalPricingFromDatabase(currency, getRoundedPriceInInteger(clubSupporterPricingRatios[currency]*float64(price.Amount()))), nil
}

func GetClubSupporterAllPricingDetails(price *Price) ([]*Price, error) {

	var prc []*Price

	for c, val := range clubSupporterPricingRatios {
		prc = append(prc, UnmarshalPricingFromDatabase(c, getRoundedPriceInInteger(val*float64(price.Amount()))))
	}

	return prc, nil
}
