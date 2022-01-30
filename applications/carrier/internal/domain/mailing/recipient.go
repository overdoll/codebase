package mailing

import "overdoll/applications/carrier/internal/domain/identifier"

type Recipient struct {
	username string
	email    string
	language string
}

func NewRecipient(username, email, language string) (*Recipient, error) {

	if _, err := validateEmail(email); err != nil {
		return nil, err
	}

	return &Recipient{
		username: username,
		email:    email,
		language: language,
	}, nil
}

func NewRecipientFromIdentifier(identifier *identifier.Identifier) (*Recipient, error) {
	return &Recipient{
		username: identifier.Username(),
		email:    identifier.Email(),
		language: identifier.Language(),
	}, nil
}

func (r *Recipient) Username() string {
	return r.username
}

func (r *Recipient) Email() string {
	return r.email
}

func (r *Recipient) Language() string {
	return r.language
}

func (r *Recipient) SetEmail(email string) error {
	r.email = email

	return nil
}
