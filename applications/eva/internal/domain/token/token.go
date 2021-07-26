package token

import (
	"errors"
	"time"
)

type AuthenticationToken struct {
	cookie string
	email  string

	verified   bool
	expiration time.Duration

	session string

	consumed bool

	sameSession bool

	multiFactorTOTP bool
}

var (
	OTPKey = "otp-key"
)

var (
	ErrTokenNotVerified = errors.New("token is not yet verified")
	ErrTokenNotFound    = errors.New("token not found")
)

func NewAuthenticationToken(id, email, session string) (*AuthenticationToken, error) {

	ck := &AuthenticationToken{
		cookie:     id,
		expiration: time.Minute * 15,
		email:      email,
		verified:   false,
		session:    session,
	}

	return ck, nil
}

func UnmarshalAuthenticationTokenFromDatabase(cookie, email string, verified bool, session string) *AuthenticationToken {
	return &AuthenticationToken{
		cookie:      cookie,
		email:       email,
		verified:    verified,
		session:     session,
		sameSession: false,
		expiration:  time.Minute * 15,
	}
}

func (c *AuthenticationToken) Token() string {
	return c.cookie
}

func (c *AuthenticationToken) Email() string {
	return c.email
}

func (c *AuthenticationToken) Expiration() time.Duration {
	return c.expiration
}

func (c *AuthenticationToken) Consumed() bool {
	return c.consumed
}

func (c *AuthenticationToken) Session() string {
	return c.session
}

func (c *AuthenticationToken) Verified() bool {
	return c.verified
}

func (c *AuthenticationToken) MakeRedeemed() error {

	c.verified = true

	return nil
}

func (c *AuthenticationToken) IsTOTPRequired() bool {
	return c.multiFactorTOTP
}

func (c *AuthenticationToken) RequireMultiFactor(totp bool) {
	c.multiFactorTOTP = totp
}

// MakeConsumed - this will always be ran before a cookie is deleted, i.e. being consumed by the target application (registration, login)
func (c *AuthenticationToken) MakeConsumed() error {

	if !c.Verified() {
		return ErrTokenNotVerified
	}

	c.consumed = true
	return nil
}

func (c *AuthenticationToken) SetSession(session string) {
	c.session = session
}
