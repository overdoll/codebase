package details

import (
	"errors"
	"github.com/biter777/countries"
	"overdoll/libraries/principal"
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

func (a *AccountDetails) AccountId() string {
	return a.accountId
}

func (a *AccountDetails) Country() countries.CountryCode {
	return a.countryOfResidence
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

func (a *AccountDetails) CanView(requester *principal.Principal) error {
	if requester.IsStaff() {
		return nil
	}
	return requester.BelongsToAccount(a.accountId)
}

func UnmarshalAccountDetailsFromDatabase(accountId, firstName, lastName, countryOfResidence string) *AccountDetails {
	country := countries.ByName(countryOfResidence)
	return &AccountDetails{
		accountId:          accountId,
		firstName:          firstName,
		lastName:           lastName,
		countryOfResidence: country,
	}
}
