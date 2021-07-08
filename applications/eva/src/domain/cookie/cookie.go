package cookie

import (
	"errors"
	"time"
)

type Cookie struct {
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
	ErrCookieNotRedeemed = errors.New("cookie is not yet redeemed")
	ErrCookieExpired     = errors.New("cookie is expired")
	ErrCookieNotFound    = errors.New("cookie not found")
)

func NewCookie(id, email, session string) (*Cookie, error) {

	ck := &Cookie{
		cookie:     id,
		expiration: time.Minute * 15,
		email:      email,
		redeemed:   false,
		session:    session,
	}

	return ck, nil
}

func UnmarshalCookieFromDatabase(cookie, email string, redeemed bool, session string) *Cookie {
	return &Cookie{
		cookie:      cookie,
		email:       email,
		redeemed:    redeemed,
		session:     session,
		sameSession: false,
	}
}

func (c *Cookie) Cookie() string {
	return c.cookie
}

func (c *Cookie) Email() string {
	return c.email
}

func (c *Cookie) Expiration() time.Duration {
	return c.expiration
}

func (c *Cookie) Consumed() bool {
	return c.consumed
}

func (c *Cookie) Session() string {
	return c.session
}

func (c *Cookie) Redeemed() bool {
	return c.redeemed
}

func (c *Cookie) MakeRedeemed() error {

	c.redeemed = true

	return nil
}

func (c *Cookie) IsTOTPRequired() bool {
	return c.multiFactorTOTP
}

func (c *Cookie) RequireMultiFactor(totp bool) {
	c.multiFactorTOTP = totp
}

// MakeConsumed - this will always be ran before a cookie is deleted, i.e. being consumed by the target application (registration, login)
func (c *Cookie) MakeConsumed() error {

	if !c.Redeemed() {
		return ErrCookieNotRedeemed
	}

	c.consumed = true
	return nil
}

func (c *Cookie) SetSession(session string) {
	c.session = session
}
