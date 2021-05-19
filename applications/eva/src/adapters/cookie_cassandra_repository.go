package adapters

import (
	"context"
	"fmt"
	"time"

	"github.com/gocql/gocql"
	"github.com/scylladb/gocqlx/v2"
	"github.com/scylladb/gocqlx/v2/qb"
	"overdoll/applications/eva/src/domain/cookie"
)

type AuthenticationCookie struct {
	Cookie     string    `db:"cookie"`
	Email      string    `db:"email"`
	Redeemed   int       `db:"redeemed"`
	Expiration time.Time `db:"expiration"`
	Session    string    `db:"session"`
}

type CookieRepository struct {
	session gocqlx.Session
}

func NewCookieCassandraRepository(session gocqlx.Session) CookieRepository {
	return CookieRepository{session: session}
}

// GetCookieById - Get authentication cookie by ID
func (r CookieRepository) GetCookieById(ctx context.Context, id string) (*cookie.Cookie, error) {

	var cookieItem *AuthenticationCookie

	queryCookie := qb.Select("authentication_cookies").
		Where(qb.Eq("cookie")).
		Query(r.session).
		Consistency(gocql.LocalQuorum).
		BindStruct(&AuthenticationCookie{Cookie: id})

	if err := queryCookie.Get(&cookieItem); err != nil {

		if err == gocql.ErrNotFound {
			return nil, cookie.ErrCookieNotFound
		}

		return nil, fmt.Errorf("select() failed: '%s", err)
	}

	return cookie.UnmarshalCookieFromDatabase(
		cookieItem.Cookie,
		cookieItem.Email,
		cookieItem.Redeemed == 1,
		cookieItem.Session,
		cookieItem.Expiration,
	), nil
}

// DeleteCookieById - Delete cookie by ID
func (r CookieRepository) DeleteCookieById(ctx context.Context, id string) error {

	deleteCookie := AuthenticationCookie{
		Cookie: id,
	}

	// Delete authentication cookie with this ID
	queryCookie := qb.
		Delete("authentication_cookies").
		Where(qb.Eq("cookie")).
		Query(r.session).
		Consistency(gocql.LocalQuorum).
		BindStruct(deleteCookie)

	if err := queryCookie.ExecRelease(); err != nil {

		if err == gocql.ErrNotFound {
			return cookie.ErrCookieNotFound
		}

		return fmt.Errorf("delete() failed: '%s", err)
	}

	return nil
}

// CreateCookie - Create a Cookie
func (r CookieRepository) CreateCookie(ctx context.Context, instance *cookie.Cookie) error {

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
		Consistency(gocql.LocalQuorum).
		BindStruct(authCookie)

	if err := insertCookie.ExecRelease(); err != nil {
		return fmt.Errorf("ExecRelease() failed: '%s", err)
	}

	return nil
}

func (r CookieRepository) UpdateCookie(ctx context.Context, instance *cookie.Cookie) error {

	redeemed := 0

	if instance.Redeemed() {
		redeemed = 1
	}

	// get authentication cookie with this ID
	authCookie := &AuthenticationCookie{
		Cookie:   instance.Cookie(),
		Redeemed: redeemed,
		Email:    instance.Email(),
		Session:  instance.Session(),
	}

	// if not expired, then update cookie
	updateCookie := qb.Update("authentication_cookies").
		Set("redeemed").
		Where(qb.Eq("cookie"), qb.Eq("email")).
		Query(r.session).
		Consistency(gocql.LocalQuorum).
		BindStruct(authCookie)

	if err := updateCookie.ExecRelease(); err != nil {

		if err == gocql.ErrNotFound {
			return cookie.ErrCookieNotFound
		}

		return fmt.Errorf("update() failed: '%s", err)
	}

	return nil
}
