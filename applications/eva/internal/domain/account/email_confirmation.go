package account

import (
	"strings"
	"time"

	"github.com/segmentio/ksuid"
)

type EmailConfirmation struct {
	id      string
	email   string
	expires time.Duration
}

func NewEmailConfirmation(email string) (*EmailConfirmation, error) {
	return &EmailConfirmation{
		id:      ksuid.New().String(),
		email:   strings.ToLower(email),
		expires: time.Minute * 10,
	}, nil
}

func (c *EmailConfirmation) Email() string {
	return c.email
}

func (c *EmailConfirmation) ID() string {
	return c.id
}

func (c *EmailConfirmation) Expires() time.Duration {
	return c.expires
}
