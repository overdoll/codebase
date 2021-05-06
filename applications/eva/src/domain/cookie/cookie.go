package cookie

import (
	"errors"
	"fmt"
	"time"
)

type Cookie struct {
	cookie string
	email  string

	redeemed   bool
	expiration time.Time

	session string

	consumed bool

	sameSession bool
}

var (
	OTPKey = "otp-key"
)

var (
	ErrCookieNotRedeemed = errors.New("cookie is not yet redeemed")
	ErrCookieExpired     = errors.New("cookie is expired")
)

type NotFoundError struct {
	CookieUUID string
}

func (e NotFoundError) Error() string {
	return fmt.Sprintf("cookie '%s' not found", e.CookieUUID)
}

func NewCookie(id string, email string, session string) (*Cookie, error) {

	ck := &Cookie{
		cookie:      id,
		expiration:  time.Now().Add(time.Minute * 5),
		email:       email,
		redeemed:    false,
		session:     session,
		sameSession: false,
	}

	return ck, nil
}

func UnmarshalCookieFromDatabase(cookie string, email string, redeemed bool, session string, expiration time.Time) *Cookie {
	return &Cookie{
		cookie:      cookie,
		email:       email,
		redeemed:    redeemed,
		session:     session,
		expiration:  expiration,
		sameSession: false,
	}
}

func (c *Cookie) Cookie() string {
	return c.cookie
}

func (c *Cookie) Email() string {
	return c.email
}

func (c *Cookie) Expiration() time.Time {
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

func (c *Cookie) SameSession() bool {
	return c.sameSession
}

func (c *Cookie) MakeRedeemed() error {

	if c.IsExpired() {
		return ErrCookieExpired
	}

	c.redeemed = true

	return nil
}

// MakeConsumed - this will always be ran before a cookie is deleted, i.e. being consumed by the target application (registration, login)
func (c *Cookie) MakeConsumed() error {

	if !c.Redeemed() {
		return ErrCookieNotRedeemed
	}

	if c.IsExpired() {
		return ErrCookieExpired
	}

	c.consumed = true
	return nil
}

func (c *Cookie) MakeSameSession() error {
	c.sameSession = true
	return nil
}

func (c *Cookie) IsExpired() bool {
	return time.Now().After(c.expiration)
}

func (c *Cookie) SetSession(session string) {
	c.session = session
}
