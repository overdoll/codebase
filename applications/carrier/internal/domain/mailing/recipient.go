package mailing

import (
	"overdoll/applications/carrier/internal/domain/identifier"
)

type Recipient struct {
	username string
	email    string
}

func NewRecipient(username, email string) (*Recipient, error) {

	if _, err := validateEmail(email); err != nil {
		return nil, err
	}

	return &Recipient{
		username: username,
		email:    email,
	}, nil
}

func NewRecipientFromIdentifier(identifier *identifier.Identifier) (*Recipient, error) {
	return &Recipient{
		username: identifier.Username(),
		email:    identifier.Email(),
	}, nil
}

func (r *Recipient) Username() string {
	return r.username
}

func (r *Recipient) Email() string {
	return r.email
}

func (r *Recipient) SetEmail(email string) error {
	r.email = email

	return nil
}
