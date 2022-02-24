package billing

import (
	"golang.org/x/text/currency"
	"golang.org/x/text/language"
	"overdoll/libraries/location"
)

const (
	clubSupporterBasePrice = 6.99
)

var (
	clubSupporterPricingRatios = map[Currency]float64{
		USD: 1,
		CAD: 1,
		AUD: 1,
		JPY: 1,
		GBP: 1,
		EUR: 1,
	}
)

func GetClubSupporterLocalizedPricingDetails(location *location.Location) (*Price, error) {

	region, err := language.ParseRegion(location.Country())

	if err != nil {
		return nil, err
	}

	curr, ok := currency.FromRegion(region)

	if !ok {
		return UnmarshalPricingFromDatabase(USD, clubSupporterPricingRatios[USD]*clubSupporterBasePrice), nil
	}

	newCurrency, err := CurrencyFromString(curr.String())

	if err != nil {
		return nil, err
	}

	return UnmarshalPricingFromDatabase(newCurrency, clubSupporterPricingRatios[newCurrency]*clubSupporterBasePrice), nil
}

func GetClubSupporterPricingForCurrency(currency Currency) (*Price, error) {
	return UnmarshalPricingFromDatabase(currency, clubSupporterPricingRatios[currency]*clubSupporterBasePrice), nil
}

func GetClubSupporterAllPricingDetails() ([]*Price, error) {

	var prc []*Price

	for c, val := range clubSupporterPricingRatios {
		prc = append(prc, UnmarshalPricingFromDatabase(c, val*clubSupporterBasePrice))
	}

	return prc, nil
}
