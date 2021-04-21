package cassandra

import (
	"context"
	"fmt"
	"time"

	"github.com/scylladb/gocqlx/v2/qb"
	cookie2 "overdoll/applications/eva/src/domain/cookie"
	"overdoll/libraries/ksuid"
)

type AuthenticationCookie struct {
	Cookie     ksuid.UUID `db:"cookie"`
	Email      string     `db:"email"`
	Redeemed   int        `db:"redeemed"`
	Expiration time.Time  `db:"expiration"`
	Session    string     `db:"session"`
}

// GetCookieById - Get authentication cookie by ID
func (r Repository) GetCookieById(ctx context.Context, id ksuid.UUID) (*AuthenticationCookie, error) {

	cookieItem := &AuthenticationCookie{Cookie: id}

	queryCookie := qb.Select("authentication_cookies").
		Where(qb.Eq("cookie")).
		Query(r.session).
		BindStruct(cookieItem)

	if err := queryCookie.Get(&cookieItem); err != nil {
		return nil, fmt.Errorf("select() failed: '%s", err)
	}

	ck, err := cookie2.NewCookie(cookieItem.Cookie, cookieItem.Email, cookieItem.Expiration)

	if err != nil {
		return nil, err
	}

	// make sure cookie is valid when grabbing it from the database
	err = ck.IsValid()

	if err != nil {
		return nil, err
	}

	return cookieItem, nil
}

// DeleteCookieById - Delete cookie by ID
func (r Repository) DeleteCookieById(ctx context.Context, id ksuid.UUID) error {

	deleteCookie := AuthenticationCookie{
		Cookie: id,
	}

	// Delete authentication cookie with this ID
	queryCookie := qb.
		Delete("authentication_cookies").
		Where(qb.Eq("cookie")).
		Query(r.session).
		BindStruct(deleteCookie)

	if err := queryCookie.ExecRelease(); err != nil {
		return fmt.Errorf("delete() failed: '%s", err)
	}

	return nil
}

// CreateCookie - Create a Cookie
func (r Repository) CreateCookie(ctx context.Context, instance *cookie2.Cookie) (*AuthenticationCookie, error) {

	// run a query to create the authentication token
	authCookie := &AuthenticationCookie{
		Cookie:     instance.Cookie(),
		Email:      instance.Email(),
		Redeemed:   0,
		Expiration: instance.Expiration(),
		Session:    instance.Session(),
	}

	insertCookie := qb.Insert("authentication_cookies").
		Columns("cookie", "email", "redeemed", "expiration", "session").
		Query(r.session).
		BindStruct(authCookie)

	if err := insertCookie.ExecRelease(); err != nil {
		return nil, fmt.Errorf("ExecRelease() failed: '%s", err)
	}

	return authCookie, nil
}

func (r Repository) UpdateCookieRedeemed(ctx context.Context, instance *cookie2.Cookie) error {
	// get authentication cookie with this ID
	authCookie := AuthenticationCookie{
		Cookie:   instance.Cookie(),
		Redeemed: 1,
		Email:    instance.Email(),
	}

	// if not expired, then update cookie
	updateCookie := qb.Update("authentication_cookies").
		Set("redeemed").
		Where(qb.Eq("cookie"), qb.Eq("email")).
		Query(r.session).
		BindStruct(authCookie)

	if err := updateCookie.ExecRelease(); err != nil {
		return fmt.Errorf("update() failed: '%s", err)
	}

	return nil
}
