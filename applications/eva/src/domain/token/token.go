package token

import (
	"errors"
	"time"
)

type AuthenticationToken struct {
	cookie string
	email  string

	redeemed   bool
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
	ErrTokenNotRedeemed = errors.New("token is not yet redeemed")
	ErrTokenNotFound    = errors.New("token not found")
)

func NewAuthenticationToken(id, email, session string) (*AuthenticationToken, error) {

	ck := &AuthenticationToken{
		cookie:     id,
		expiration: time.Minute * 15,
		email:      email,
		redeemed:   false,
		session:    session,
	}

	return ck, nil
}

func UnmarshalAuthenticationTokenFromDatabase(cookie, email string, redeemed bool, session string) *AuthenticationToken {
	return &AuthenticationToken{
		cookie:      cookie,
		email:       email,
		redeemed:    redeemed,
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

func (c *AuthenticationToken) Redeemed() bool {
	return c.redeemed
}

func (c *AuthenticationToken) MakeRedeemed() error {

	c.redeemed = true

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

	if !c.Redeemed() {
		return ErrTokenNotRedeemed
	}

	c.consumed = true
	return nil
}

func (c *AuthenticationToken) SetSession(session string) {
	c.session = session
}
