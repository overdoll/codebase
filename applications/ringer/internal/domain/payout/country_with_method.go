package payout

import "github.com/biter777/countries"

type CountryWithMethod struct {
	country countries.CountryCode
	methods []Method
}

func (c *CountryWithMethod) Country() countries.CountryCode {
	return c.country
}

func (c *CountryWithMethod) Methods() []Method {
	return c.methods
}

func GetAllCountriesWithPayoutMethods() []*CountryWithMethod {

	var methods []*CountryWithMethod

	for _, country := range countries.All() {

		appliedCountry := &CountryWithMethod{
			country: country,
			methods: nil,
		}

		for _, supported := range paxumSupportedCountries {
			if country == supported {
				appliedCountry.methods = append(appliedCountry.methods, Paxum)
				break
			}
		}

		methods = append(methods, appliedCountry)
	}

	return methods
}
