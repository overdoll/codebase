package server

import (
	"context"
	"fmt"
	"github.com/gocql/gocql"
	"github.com/scylladb/gocqlx/v2/qb"
	evav1 "project01101000/codebase/applications/eva/proto"
	"time"
)

// DeleteAuthenticationCookie - Delete cookie because we don't want it to be used anymore
func (s *Server) DeleteAuthenticationCookie(ctx context.Context, request *evav1.GetAuthenticationCookieRequest) (*evav1.DeleteAuthenticationCookieResponse, error) {
	if request == nil || request.Cookie == "" {
		return nil, fmt.Errorf("cookie is not provided")
	}

	u, err := gocql.ParseUUID(request.Cookie)

	if err != nil {
		return nil, fmt.Errorf("uuid is not valid")
	}

	queryCookie := qb.
		Delete("authentication_cookies").
		Where(qb.Eq("id")).
		Query(s.session)

	// get authentication cookie with this ID
	authCookie := AuthenticationCookie{
		Cookie: u,
	}

	queryCookie.BindStruct(authCookie)

	return &evav1.DeleteAuthenticationCookieResponse{Success: "true"}, nil
}

func (s *Server) CreateAuthenticationCookie(ctx context.Context, request *evav1.CreateAuthenticationCookieRequest) (*evav1.CreateAuthenticationCookieResponse, error) {
	if request == nil || request.Email == "" {
		return nil, fmt.Errorf("email is not provided")
	}

	if !emailRegex.MatchString(request.Email) {
		return nil, fmt.Errorf("email is not valid")
	}

	// run a query to create the authentication token
	insertCookie := qb.Insert("authentication_cookies").
		Columns("cookie", "email", "redeemed", "expiration").
		Query(s.session)

	authCookie := AuthenticationCookie{
		Cookie:   gocql.TimeUUID(),
		Email:    request.Email,
		Redeemed: 0,
		// Expires after 5 minutes
		Expiration: time.Now().Add(time.Minute * 5),
	}

	insertCookie.BindStruct(authCookie)

	if err := insertCookie.ExecRelease(); err != nil {
		return nil, fmt.Errorf("ExecRelease() failed: '%s", err)
	}

	cookie := new(evav1.AuthenticationCookie)
	cookie.Email = authCookie.Email
	cookie.Redeemed = authCookie.Redeemed != 0
	cookie.Expiration = authCookie.Expiration.String()
	cookie.Cookie = authCookie.Cookie.String()

	return &evav1.CreateAuthenticationCookieResponse{Cookie: cookie}, nil
}

func (s *Server) RedeemAuthenticationCookie(ctx context.Context, request *evav1.GetAuthenticationCookieRequest) (*evav1.GetAuthenticationCookieResponse, error) {
	if request == nil || request.Cookie == "" {
		return nil, fmt.Errorf("cookie is not provided")
	}

	u, err := gocql.ParseUUID(request.Cookie)

	if err != nil {
		return nil, fmt.Errorf("uuid is not valid")
	}

	// first check cookie to make sure it's not expired
	queryCookie := qb.Select("authentication_cookies").
		Where(qb.EqLit("cookie", u.String())).
		Query(s.session)

	var queryCookieItem AuthenticationCookie

	if err := queryCookie.Get(&queryCookieItem); err != nil {
		return nil, fmt.Errorf("select() failed: '%s", err)
	}

	if time.Now().After(queryCookieItem.Expiration) {
		return nil, fmt.Errorf("cookie expired")
	}

	// get authentication cookie with this ID
	authCookie := AuthenticationCookie{
		Cookie:   u,
		Redeemed: 1,
	}

	// if not expired, then update cookie
	updateCookie := qb.Update("authentication_cookies").
		Set("redeemed").
		Where(qb.Eq("cookie")).
		Query(s.session)

	updateCookie.BindStruct(authCookie)

	if err := queryCookie.ExecRelease(); err != nil {
		return nil, fmt.Errorf("update() failed: '%s", err)
	}

	cookie := new(evav1.AuthenticationCookie)
	cookie.Email = queryCookieItem.Email
	cookie.Redeemed = true
	cookie.Expiration = queryCookieItem.Expiration.String()
	cookie.Cookie = queryCookieItem.Cookie.String()

	return &evav1.GetAuthenticationCookieResponse{Cookie: cookie}, nil
}

func (s *Server) GetAuthenticationCookie(ctx context.Context, request *evav1.GetAuthenticationCookieRequest) (*evav1.GetAuthenticationCookieResponse, error) {
	if request == nil || request.Cookie == "" {
		return nil, fmt.Errorf("cookie is not provided")
	}

	u, err := gocql.ParseUUID(request.Cookie)

	if err != nil {
		return nil, fmt.Errorf("uuid is not valid")
	}

	queryCookie := qb.Select("authentication_cookies").
		Where(qb.Eq("cookie")).
		Columns("cookie", "email", "redeemed", "expiration").
		Query(s.session)

	// get authentication cookie with this ID
	authCookie := AuthenticationCookie{
		Cookie: u,
	}

	queryCookie.BindStruct(authCookie)

	var cookieItem *AuthenticationCookie

	if err := queryCookie.Select(&cookieItem); err != nil {
		return nil, fmt.Errorf("select() failed: '%s", err)
	}

	if time.Now().After(cookieItem.Expiration) {
		return nil, fmt.Errorf("cookie expired")
	}

	cookie := new(evav1.AuthenticationCookie)
	cookie.Email = cookieItem.Email
	cookie.Redeemed = cookieItem.Redeemed != 0
	cookie.Expiration = cookieItem.Expiration.String()
	cookie.Cookie = cookieItem.Cookie.String()

	return &evav1.GetAuthenticationCookieResponse{Cookie: cookie}, nil
}
