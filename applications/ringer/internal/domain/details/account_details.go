package details

import (
	"github.com/biter777/countries"
	"overdoll/libraries/errors/domainerror"
	"overdoll/libraries/principal"
)

var (
	ErrAccountDetailsNotFound = domainerror.NewValidation("account details not found")
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

func (a *AccountDetails) canUpdate(requester *principal.Principal) error {

	if err := requester.BelongsToAccount(a.accountId); err != nil {
		return err
	}

	if !requester.IsArtist() && !requester.IsStaff() {
		return principal.ErrNotAuthorized
	}

	return nil
}

func (a *AccountDetails) UpdateFirstName(requester *principal.Principal, s string) error {
	if err := a.canUpdate(requester); err != nil {
		return err
	}
	a.firstName = s
	return nil
}

func (a *AccountDetails) UpdateLastName(requester *principal.Principal, s string) error {
	if err := a.canUpdate(requester); err != nil {
		return err
	}
	a.lastName = s
	return nil
}

func (a *AccountDetails) UpdateCountry(requester *principal.Principal, s string) error {
	if err := a.canUpdate(requester); err != nil {
		return err
	}
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
