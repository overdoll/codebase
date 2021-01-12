package server

import (
	"context"
	"fmt"
	"github.com/gocql/gocql"
	"github.com/scylladb/gocqlx/v2/qb"
	eva "project01101000/codebase/applications/eva/proto"
	"project01101000/codebase/applications/eva/src/models"

	"time"
)

// DeleteAuthenticationCookie - Delete cookie because we don't want it to be used anymore
func (s *Server) DeleteAuthenticationCookie(ctx context.Context, request *eva.GetAuthenticationCookieRequest) (*eva.DeleteAuthenticationCookieResponse, error) {
	u, err := gocql.ParseUUID(request.Cookie)

	if err != nil {
		return nil, fmt.Errorf("uuid is not valid")
	}

	deleteCookie := models.AuthenticationCookie{
		Cookie: u,
	}

	// Delete authentication cookie with this ID
	queryCookie := qb.
		Delete("authentication_cookies").
		Where(qb.Eq("cookie")).
		Query(s.session).
		BindStruct(deleteCookie)

	if err := queryCookie.ExecRelease(); err != nil {
		return nil, fmt.Errorf("delete() failed: '%s", err)
	}

	return &eva.DeleteAuthenticationCookieResponse{Success: "true"}, nil
}

func (s *Server) CreateAuthenticationCookie(ctx context.Context, request *eva.CreateAuthenticationCookieRequest) (*eva.AuthenticationCookie, error) {
	// run a query to create the authentication token
	authCookie := models.AuthenticationCookie{
		Cookie:   gocql.TimeUUID(),
		Email:    request.Email,
		Redeemed: 0,
		// Expires after 5 minutes
		Expiration: time.Now().Add(time.Minute * 5),
		Session:    request.Session,
	}

	insertCookie := qb.Insert("authentication_cookies").
		Columns("cookie", "email", "redeemed", "expiration", "session").
		Query(s.session).
		BindStruct(authCookie)

	if err := insertCookie.ExecRelease(); err != nil {
		return nil, fmt.Errorf("ExecRelease() failed: '%s", err)
	}

	cookie := &eva.AuthenticationCookie{
		Email:    authCookie.Email,
		Redeemed: authCookie.Redeemed != 0,
		Expiration: authCookie.Expiration.String(),
		Cookie: authCookie.Cookie.String(),
		Session: authCookie.Session,
	}

	return cookie, nil
}

func (s *Server) RedeemAuthenticationCookie(ctx context.Context, request *eva.GetAuthenticationCookieRequest) (*eva.AuthenticationCookie, error) {
	u, err := gocql.ParseUUID(request.Cookie)

	if err != nil {
		return nil, fmt.Errorf("uuid is not valid")
	}

	// first check cookie to make sure it's not expired
	queryCookie := qb.Select("authentication_cookies").
		Where(qb.EqLit("cookie", u.String())).
		Query(s.session)

	var queryCookieItem models.AuthenticationCookie

	if err := queryCookie.Get(&queryCookieItem); err != nil {
		return nil, fmt.Errorf("select() failed: '%s", err)
	}

	if time.Now().After(queryCookieItem.Expiration) {
		return nil, fmt.Errorf("cookie expired")
	}

	// get authentication cookie with this ID
	authCookie := models.AuthenticationCookie{
		Cookie:   u,
		Redeemed: 1,
		Email:    queryCookieItem.Email,
	}

	// if not expired, then update cookie
	updateCookie := qb.Update("authentication_cookies").
		Set("redeemed").
		Where(qb.Eq("cookie"), qb.Eq("email")).
		Query(s.session).
		BindStruct(authCookie)

	if err := updateCookie.ExecRelease(); err != nil {
		return nil, fmt.Errorf("update() failed: '%s", err)
	}

	cookie := &eva.AuthenticationCookie{
		Cookie:     queryCookieItem.Cookie.String(),
		Redeemed:   true,
		Expiration: queryCookieItem.Expiration.String(),
		Email:      queryCookieItem.Email,
		Session:    queryCookieItem.Session,
	}
	return cookie, nil
}

func (s *Server) GetAuthenticationCookie(ctx context.Context, request *eva.GetAuthenticationCookieRequest) (*eva.AuthenticationCookie, error) {
	u, err := gocql.ParseUUID(request.Cookie)

	if err != nil {
		return nil, fmt.Errorf("uuid is not valid")
	}

	queryCookie := qb.Select("authentication_cookies").
		Where(qb.EqLit("cookie", u.String())).
		Query(s.session)

	var cookieItem models.AuthenticationCookie

	if err := queryCookie.Get(&cookieItem); err != nil {
		return nil, fmt.Errorf("select() failed: '%s", err)
	}

	if time.Now().After(cookieItem.Expiration) {
		return nil, fmt.Errorf("cookie expired")
	}

	cookie := &eva.AuthenticationCookie {
		Email: cookieItem.Email,
		Redeemed: cookieItem.Redeemed != 0,
		Expiration: cookieItem.Expiration.String(),
		Cookie: cookieItem.Cookie.String(),
		Session: cookieItem.Session,
	}

	return cookie, nil
}
