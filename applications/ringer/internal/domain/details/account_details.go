package details

import (
	"errors"
	"github.com/biter777/countries"
)

var (
	ErrAccountDetailsNotFound = errors.New("account details not found")
)

type AccountDetails struct {
	accountId string

	firstName          string
	lastName           string
	countryOfResidence countries.CountryCode
}

func (a *AccountDetails) FirstName() string {
	return a.firstName
}

func (a *AccountDetails) LastName() string {
	return a.lastName
}

func (a *AccountDetails) UpdateFirstName(s string) error {
	a.firstName = s
	return nil
}

func (a *AccountDetails) UpdateLastName(s string) error {
	a.lastName = s
	return nil
}

func (a *AccountDetails) UpdateCountry(s string) error {
	a.countryOfResidence = countries.ByName(s)
	return nil
}
