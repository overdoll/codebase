package cookie

import (
	"time"

	"overdoll/libraries/ksuid"
)

type Cookie struct {
	cookie ksuid.UUID
	email  string

	redeemed   bool
	expiration time.Time

	session string

	registered bool
}

func NewCookie(id ksuid.UUID, email string, expiration time.Time) (*Cookie, error) {

	// TODO: add some email validation?

	ck := &Cookie{
		cookie:     id,
		expiration: expiration,
		email:      email,
	}

	// No expiration set - set a new one
	if ck.expiration.IsZero() {
		ck.expiration = time.Now().Add(time.Minute * 5)
	}

	return ck, nil
}

func (c *Cookie) Cookie() ksuid.UUID {
	return c.cookie
}

func (c *Cookie) Email() string {
	return c.email
}

func (c *Cookie) Expiration() time.Time {
	return c.expiration
}

func (c *Cookie) Registered() bool {
	return c.registered
}

func (c *Cookie) Session() string {
	return c.session
}

func (c *Cookie) Redeemed() bool {
	return c.redeemed
}

func (c *Cookie) MakeRedeemed() {
	c.redeemed = true
}

func (c *Cookie) MakeRegistered() {
	c.registered = true
}

func (c *Cookie) IsExpired() bool {

	if !time.Now().After(c.expiration) {
		return true
	}

	return false
}

func (c *Cookie) SetSession(session string) {
	c.session = session
}
