package mailing

import (
	"overdoll/libraries/account"
)

type Recipient struct {
	username string
	email    string
}

func NewRecipient(username, email string) (*Recipient, error) {
	return &Recipient{
		username: username,
		email:    email,
	}, nil
}

func (r *Recipient) Username() string {
	return r.username
}

func (r *Recipient) Email() string {
	return r.username
}

func RecipientFromAccount(acc *account.Account) *Recipient {
	return &Recipient{
		username: acc.Username(),
		email:    acc.Email(),
	}
}
