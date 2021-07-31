package mailing

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
