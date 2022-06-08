package account

import (
	"overdoll/libraries/errors/domainerror"
	"strings"

	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
)

type Email struct {
	*paging.Node
	email     string
	accountId string
	status    EmailStatus
}

var (
	ErrEmailNotConfirmed = domainerror.NewValidation("email not confirmed")
)

const (
	maxEmailsLimit = 5
)

func UnmarshalEmailFromDatabase(email, accountId string, status int) *Email {
	var st EmailStatus

	if status == 1 {
		st = EmailConfirmed
	}

	if status == 2 {
		st = EmailPrimary
	}

	return &Email{
		email:     email,
		status:    st,
		accountId: accountId,
	}
}

func NewConfirmedEmail(email, accountId string) *Email {
	return &Email{
		email:     email,
		status:    EmailConfirmed,
		accountId: accountId,
	}
}

func (c *Email) Email() string {
	return c.email
}

func (c *Email) IsEqual(email string) bool {
	return strings.ToLower(c.email) == strings.ToLower(email)
}

func (c *Email) AccountId() string {
	return c.accountId
}

func (c *Email) Status() EmailStatus {
	return c.status
}

func (c *Email) IsConfirmed() bool {
	return c.status == EmailConfirmed
}

func (c *Email) IsPrimary() bool {
	return c.status == EmailPrimary
}

func (c *Email) MakePrimary() {
	c.status = EmailPrimary
}

func (c *Email) CanView(requester *principal.Principal) error {
	if err := requester.BelongsToAccount(c.accountId); err != nil {
		return err
	}

	return nil
}

func ViewEmailsLimit(requester *principal.Principal, accountId string) (int, error) {
	if err := requester.BelongsToAccount(accountId); err != nil {
		return 0, err
	}

	return maxEmailsLimit, nil
}

func CanDeleteAccountEmail(requester *principal.Principal, accountId string, emails []*Email, targetEmail string) error {
	if err := requester.BelongsToAccount(accountId); err != nil {
		return err
	}

	foundEmail := false

	for _, em := range emails {
		if em.Email() == targetEmail {
			foundEmail = true

			if em.IsPrimary() {
				return domainerror.NewValidation("email is primary")
			}

			break
		}
	}

	if !foundEmail {
		return domainerror.NewValidation("email does not belong to account")
	}

	return nil
}

func CanViewAccountEmails(requester *principal.Principal, accountId string) error {
	if err := requester.BelongsToAccount(accountId); err != nil {
		return err
	}

	return nil
}
