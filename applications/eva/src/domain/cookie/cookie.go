package cookie

import (
	"fmt"
	"time"

	"overdoll/libraries/ksuid"
)

type Cookie struct {
	cookie ksuid.UUID
	email  string

	redeemed   bool
	expiration time.Time

	session string
}

func NewCookie(id ksuid.UUID, email string, expiration time.Time) (*Cookie, error) {

	// TODO: add some email validation'

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

func (c *Cookie) Session() string {
	return c.session
}

func (c *Cookie) Redeem() {
	c.redeemed = true
}

func (c *Cookie) IsValid() error {

	if !c.redeemed && !time.Now().After(c.expiration) {
		return nil
	}

	return fmt.Errorf("cookie %s is not valid", c.cookie)
}

func (c *Cookie) SetSession(session string) {
	c.session = session
}
