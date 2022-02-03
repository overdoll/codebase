package mailing

import (
	"errors"
	"net/mail"
	"os"
	"strings"
)

var (
	ErrInvalidEmail = errors.New("invalid email")
)

// simple email validator
func validateEmail(email string) (string, error) {

	_, err := mail.ParseAddress(email)

	if err != nil {
		return "", err
	}

	domainWhitelist := os.Getenv("EMAIL_DOMAIN_WHITELIST")

	// in debug mode, only allow testmail.app so developers don't enter real emails
	if domainWhitelist != "" {
		components := strings.Split(email, "@")
		domain := components[1]

		foundAllowedDomain := false

		for _, allowedDomain := range strings.Split(domainWhitelist, ",") {
			if allowedDomain == domain {
				foundAllowedDomain = true
				break
			}
		}

		if !foundAllowedDomain {
			return "", ErrInvalidEmail
		}
	}

	return strings.ToLower(email), nil
}
