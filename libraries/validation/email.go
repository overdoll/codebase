package validation

import (
	"errors"
	"net/mail"
	"overdoll/libraries/helpers"
	"strings"
)

var (
	ErrInvalidEmail = errors.New("invalid email")
)

// simple email validator
func ValidateEmail(email string) (string, error) {

	_, err := mail.ParseAddress(email)

	if err != nil {
		return "", err
	}

	// in debug mode, only allow testmail.app so developers don't enter real emails
	if helpers.IsDebug() {
		components := strings.Split(email, "@")
		domain := components[1]
		if domain != "testmail.app" {
			return "", ErrInvalidEmail
		}
	}

	return strings.ToLower(email), nil
}
