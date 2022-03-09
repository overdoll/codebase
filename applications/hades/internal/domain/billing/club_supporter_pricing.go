package billing

import (
	"golang.org/x/text/currency"
	"golang.org/x/text/language"
	"math"
	"overdoll/libraries/location"
)

const (
	clubSupporterBasePrice = 699
)

var (
	clubSupporterPricingRatios = map[Currency]float64{
		USD: 1,
		CAD: 1.45,
		AUD: 1.55,
		JPY: 129.40,
		GBP: 0.90,
		EUR: 1.10,
	}
)

func getRoundedPriceInInteger(price float64) int64 {
	return int64(math.Round(price))
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
		return UnmarshalPricingFromDatabase(USD, getRoundedPriceInInteger(clubSupporterPricingRatios[USD]*clubSupporterBasePrice)), nil
	}

	newCurrency, err := CurrencyFromString(curr.String())

	if err != nil {
		return nil, err
	}

	return UnmarshalPricingFromDatabase(newCurrency, getRoundedPriceInInteger(clubSupporterPricingRatios[newCurrency]*clubSupporterBasePrice)), nil
}

func GetClubSupporterPricingForCurrency(currency Currency) (*Price, error) {
	return UnmarshalPricingFromDatabase(currency, getRoundedPriceInInteger(clubSupporterPricingRatios[currency]*clubSupporterBasePrice)), nil
}

func GetClubSupporterAllPricingDetails() ([]*Price, error) {

	var prc []*Price

	for c, val := range clubSupporterPricingRatios {
		prc = append(prc, UnmarshalPricingFromDatabase(c, getRoundedPriceInInteger(val*clubSupporterBasePrice)))
	}

	return prc, nil
}
