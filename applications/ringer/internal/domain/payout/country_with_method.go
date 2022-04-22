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

func getMethodsFromCountryCode(country countries.CountryCode) []Method {

	var mt []Method

	for _, supported := range paxumSupportedCountries {
		if country == supported {
			mt = append(mt, Paxum)
			break
		}
	}

	return mt
}

func GetAllCountriesWithPayoutMethods() []*CountryWithMethod {

	var methods []*CountryWithMethod

	for _, country := range countries.All() {

		appliedCountry := &CountryWithMethod{
			country: country,
			methods: getMethodsFromCountryCode(country),
		}

		methods = append(methods, appliedCountry)
	}

	return methods
}

func GetCountryWithMethodFromCountryCode(code countries.CountryCode) *CountryWithMethod {
	return &CountryWithMethod{
		country: code,
		methods: getMethodsFromCountryCode(code),
	}
}
