package account

import (
	"errors"

	"overdoll/libraries/paging"
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
	ErrEmailNotConfirmed = errors.New("email not confirmed")
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
