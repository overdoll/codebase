package account

import (
	"errors"

	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
)

type EmailStatus string

const (
	EmailConfirmed   EmailStatus = "confirmed"
	EmailUnconfirmed EmailStatus = "unconfirmed"
	EmailPrimary     EmailStatus = "primary"
)

type Email struct {
	*paging.Node
	email     string
	accountId string
	status    EmailStatus
}

var (
	ErrEmailNotConfirmed     = errors.New("email not confirmed")
	ErrMaxEmailsLimitReached = errors.New("reached maximum emails limit. delete an email to add more")
)

const (
	maxEmailsLimit = 5
)

func UnmarshalEmailFromDatabase(email, accountId string, status int) *Email {
	var st EmailStatus

	if status == 0 {
		st = EmailUnconfirmed
	}

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

func (c *Email) Email() string {
	return c.email
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

func (c *Email) IsUnconfirmed() bool {
	return c.status == EmailUnconfirmed
}

func (c *Email) IsPrimary() bool {
	return c.status == EmailPrimary
}

func (c *Email) MakePrimary() {
	c.status = EmailPrimary
}

func (c *Email) MakeConfirmed(requester *principal.Principal) error {
	c.status = EmailConfirmed

	if err := requester.BelongsToAccount(c.accountId); err != nil {
		return err
	}

	return nil
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
				return errors.New("email is primary")
			}

			break
		}
	}

	if !foundEmail {
		return errors.New("email does not belong to account")
	}

	return nil
}

func CanViewAccountEmails(requester *principal.Principal, accountId string) error {
	if err := requester.BelongsToAccount(accountId); err != nil {
		return err
	}

	return nil
}
