package mailing

import (
	"os"
	"overdoll/applications/carrier/internal/domain/identifier"
)

type Recipient struct {
	username string
	email    string
	source   string
}

func NewRecipient(username, email string) (*Recipient, error) {

	if _, err := validateEmail(email); err != nil {
		return nil, err
	}

	return &Recipient{
		username: username,
		email:    email,
		source:   os.Getenv("EMAIL_FROM_ADDRESS"),
	}, nil
}

func NewRecipientFromIdentifier(identifier *identifier.Identifier) (*Recipient, error) {
	return &Recipient{
		username: identifier.Username(),
		email:    identifier.Email(),
		source:   os.Getenv("EMAIL_FROM_ADDRESS"),
	}, nil
}

func NewRecipientFromIdentifierWithCustomSource(identifier *identifier.Identifier, source string) (*Recipient, error) {
	return &Recipient{
		username: identifier.Username(),
		email:    identifier.Email(),
		source:   source,
	}, nil
}

func (r *Recipient) Username() string {
	return r.username
}

func (r *Recipient) Email() string {
	return r.email
}

func (r *Recipient) Source() string {

	if r.source == "" {
		return os.Getenv("EMAIL_FROM_ADDRESS")
	}

	return r.source
}

func (r *Recipient) SetEmail(email string) error {
	r.email = email

	return nil
}
