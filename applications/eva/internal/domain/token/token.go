package token

import (
	"errors"
	"overdoll/applications/eva/internal/domain/location"
	"overdoll/libraries/passport"
	"strings"
	"time"

	"overdoll/applications/eva/internal/domain/account"
)

type AuthenticationToken struct {
	cookie string
	email  string

	verified   bool
	expiration time.Duration

	device string

	ip string

	location *location.Location

	consumed bool

	multiFactorTOTP bool

	registered bool
}

const (
	OTPKey = "otp-key"
)

var (
	ErrTokenNotVerified = errors.New("token is not yet verified")
	ErrTokenNotFound    = errors.New("token not found")
)

func NewAuthenticationToken(id, email string, location *location.Location, pass *passport.Passport) (*AuthenticationToken, error) {

	ck := &AuthenticationToken{
		cookie:     id,
		expiration: time.Minute * 15,
		email:      strings.ToLower(email),
		verified:   false,
		device:     pass.UserAgent(),
		location:   location,
		ip:         pass.IP(),
	}

	return ck, nil
}

func UnmarshalAuthenticationTokenFromDatabase(cookie, email string, verified bool, device, ip string, location *location.Location) *AuthenticationToken {
	return &AuthenticationToken{
		ip:         ip,
		cookie:     cookie,
		email:      email,
		verified:   verified,
		device:     device,
		location:   location,
		expiration: time.Minute * 15,
	}
}

func (c *AuthenticationToken) Token() string {
	return c.cookie
}

func (c *AuthenticationToken) Email() string {
	return c.email
}

func (c *AuthenticationToken) IP() string {
	return c.ip
}

func (c *AuthenticationToken) IsSecure(pass *passport.Passport) bool {
	return c.ip == pass.IP()
}

func (c *AuthenticationToken) Expiration() time.Duration {
	return c.expiration
}

func (c *AuthenticationToken) Consumed() bool {
	return c.consumed
}

func (c *AuthenticationToken) Device() string {
	return c.device
}

func (c *AuthenticationToken) Location() *location.Location {
	return c.location
}

func (c *AuthenticationToken) Verified() bool {
	return c.verified
}

func (c *AuthenticationToken) Registered() bool {
	return c.registered
}

func (c *AuthenticationToken) MakeVerified() error {
	c.verified = true
	return nil
}

func (c *AuthenticationToken) IsTOTPRequired() bool {
	return c.multiFactorTOTP
}

func (c *AuthenticationToken) SetAccountDetails(acc *account.Account) {
	if acc.MultiFactorEnabled() {
		c.multiFactorTOTP = true
	}
	c.registered = true
}

// MakeConsumed - this will always be ran before a cookie is deleted, i.e. being consumed by the target application (registration, login)
func (c *AuthenticationToken) MakeConsumed() error {

	if !c.Verified() {
		return ErrTokenNotVerified
	}

	c.consumed = true
	return nil
}
