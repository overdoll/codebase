package billing

import (
	"golang.org/x/text/currency"
	"golang.org/x/text/language"
	"math"
	"overdoll/libraries/location"
	"overdoll/libraries/money"
)

const (
	clubSupporterBasePrice = 699
)

var (
	clubSupporterPricingRatios = map[money.Currency]float64{
		money.USD: 1,
		money.CAD: 1.45,
		money.AUD: 1.55,
		// for JPY that is in absolute value, need to remember to use the proper base price of 699 instead of 6.99 since it doesn't convert
		money.JPY: 1.30,
		money.GBP: 0.90,
		money.EUR: 1.10,
	}
)

func getRoundedPriceInInteger(price float64) uint64 {
	return uint64(math.Round(price))
}

func GetClubSupporterLocalizedPricingDetails(location *location.Location) (*Price, error) {

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
		return UnmarshalPricingFromDatabase(money.USD, getRoundedPriceInInteger(clubSupporterPricingRatios[money.USD]*clubSupporterBasePrice)), nil
	}

	newCurrency, err := money.CurrencyFromString(curr.String())

	// ignore unknown currency errors
	if err != nil {
		newCurrency = money.USD
	}

	return UnmarshalPricingFromDatabase(newCurrency, getRoundedPriceInInteger(clubSupporterPricingRatios[newCurrency]*clubSupporterBasePrice)), nil
}

func GetClubSupporterPricingForCurrency(currency money.Currency) (*Price, error) {
	return UnmarshalPricingFromDatabase(currency, getRoundedPriceInInteger(clubSupporterPricingRatios[currency]*clubSupporterBasePrice)), nil
}

func GetClubSupporterAllPricingDetails() ([]*Price, error) {

	var prc []*Price

	for c, val := range clubSupporterPricingRatios {
		prc = append(prc, UnmarshalPricingFromDatabase(c, getRoundedPriceInInteger(val*clubSupporterBasePrice)))
	}

	return prc, nil
}
