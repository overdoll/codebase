package server

import (
	"context"
	"fmt"
	"strings"
	"time"

	"github.com/gocql/gocql"
	"github.com/scylladb/gocqlx/v2"
	"github.com/scylladb/gocqlx/v2/qb"
	eva "overdoll/applications/eva/proto"
	"overdoll/applications/eva/src/models"
	"overdoll/libraries/ksuid"
)

type Server struct {
	session gocqlx.Session
}

func CreateServer(session gocqlx.Session) *Server {
	return &Server{
		session: session,
	}
}

func (s *Server) GetUser(ctx context.Context, request *eva.GetUserRequest) (*eva.User, error) {

	u, err := ksuid.Parse(request.Id)

	if err != nil {
		return nil, fmt.Errorf("uuid is not valid")
	}

	user := models.User{
		Id: u,
	}

	queryUser := qb.Select("users").
		Where(qb.Eq("id")).
		Query(s.session).
		BindStruct(user)

	if err := queryUser.Get(&user); err != nil {
		return nil, fmt.Errorf("select() failed: '%s", err)
	}

	return &eva.User{Username: user.Username, Id: user.Id.String(), Roles: user.Roles, Verified: user.Verified}, nil
}

func (s *Server) RegisterUser(ctx context.Context, request *eva.RegisterUserRequest) (*eva.User, error) {

	userId := ksuid.New()

	// First, we do a unique insert into users_usernames
	// This ensures that we capture the username so nobody else can use it
	usernameEmail := models.UserUsername{
		Id: userId,
		// This piece of data, we want to make sure we use as lowercase, to make sure we don't get collisions
		// This table always has the username of a user, in lowercase format to make sure that we always have unique usernames
		Username: strings.ToLower(request.Username),
	}

	insertUserEmail := qb.Insert("users_usernames").
		Columns("user_id", "username").
		Unique().
		Query(s.session).
		SerialConsistency(gocql.Serial).
		BindStruct(usernameEmail)

	applied, err := insertUserEmail.ExecCAS()

	// Do our checks to make sure we got a unique username
	if err != nil {
		return nil, fmt.Errorf("ExecCAS() failed: '%s", err)
	}

	if !applied {
		return nil, fmt.Errorf("username is not unique")
	}

	// At this point, we know our username is unique & captured, so we
	// now do our insert, but this time with the email
	// note: we don't do a unique check for the email first because if they're on this stage, we already
	// did the check earlier if an account exists with this specific email. however, we will still
	// do a rollback & deletion of the username if the email is already taken, just in case
	userEmail := models.UserEmail{
		Email:  request.Email,
		UserId: userId,
	}

	// Create a lookup table that will lookup the user using email
	createUserEmail := qb.Insert("users_emails").
		Columns("email", "user_id").
		Unique().
		Query(s.session).
		SerialConsistency(gocql.Serial).
		BindStruct(userEmail)

	applied, err = createUserEmail.ExecCAS()

	if err != nil || !applied {

		// There was an error or something, so we want to gracefully recover.
		// Delete our users_usernames entry just in case, so user can try to signup again
		deleteUserUsername := qb.Delete("users_usernames").
			Where(qb.Eq("username")).
			Query(s.session).
			BindStruct(usernameEmail)

		if err := deleteUserUsername.ExecRelease(); err != nil {
			return nil, fmt.Errorf("delete() failed: '%s", err)
		}

		return nil, fmt.Errorf("ExecRelease() failed: '%s", err)
	}

	// Create a lookup table that will be used to find the user using their unique ID
	// Will also contain all major information about the user such as permissions, etc...
	user := models.User{
		Username: request.Username,
		Id:       userEmail.UserId,
		Email:    userEmail.Email,
	}

	insertUser := qb.Insert("users").
		Columns("username", "id", "email").
		Unique().
		Query(s.session).
		BindStruct(user)

	if err := insertUser.ExecRelease(); err != nil {
		return nil, fmt.Errorf("ExecRelease() failed: '%s", err)
	}

	return &eva.User{Username: request.Username, Id: user.Id.String(), Roles: user.Roles, Verified: user.Verified}, nil
}

func (s *Server) GetRegisteredEmail(ctx context.Context, request *eva.GetRegisteredEmailRequest) (*eva.User, error) {

	// get authentication cookie with this ID
	userEmail := models.UserEmail{
		Email: request.Email,
	}

	// check if email is in use
	queryEmail := qb.Select("users_emails").
		Where(qb.Eq("email")).
		Query(s.session).
		BindStruct(userEmail)

	if err := queryEmail.Get(&userEmail); err != nil {
		return &eva.User{Username: "", Id: ""}, nil
	}

	// Get our user using the User Id
	user, err := s.GetUser(ctx, &eva.GetUserRequest{Id: userEmail.UserId.String()})

	if err != nil {
		return nil, err
	}

	return user, nil
}

// DeleteAuthenticationCookie - Delete cookie because we don't want it to be used anymore
func (s *Server) DeleteAuthenticationCookie(ctx context.Context, request *eva.GetAuthenticationCookieRequest) (*eva.DeleteAuthenticationCookieResponse, error) {
	u, err := ksuid.Parse(request.Cookie)

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
		Cookie:   ksuid.New(),
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
		Email:      authCookie.Email,
		Redeemed:   authCookie.Redeemed != 0,
		Expiration: authCookie.Expiration.String(),
		Cookie:     authCookie.Cookie.String(),
		Session:    authCookie.Session,
	}

	return cookie, nil
}

func (s *Server) RedeemAuthenticationCookie(ctx context.Context, request *eva.GetAuthenticationCookieRequest) (*eva.AuthenticationCookie, error) {
	u, err := ksuid.Parse(request.Cookie)

	if err != nil {
		return nil, fmt.Errorf("uuid is not valid")
	}

	queryCookieItem := models.AuthenticationCookie{Cookie: u}

	// first check cookie to make sure it's not expired
	queryCookie := qb.Select("authentication_cookies").
		Where(qb.Eq("cookie")).
		Query(s.session).
		BindStruct(queryCookieItem)

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
	u, err := ksuid.Parse(request.Cookie)

	if err != nil {
		return nil, fmt.Errorf("uuid is not valid")
	}

	cookieItem := models.AuthenticationCookie{Cookie: u}

	queryCookie := qb.Select("authentication_cookies").
		Where(qb.Eq("cookie")).
		Query(s.session).
		BindStruct(cookieItem)

	if err := queryCookie.Get(&cookieItem); err != nil {
		fmt.Println(err)
		return nil, fmt.Errorf("select() failed: '%s", err)
	}

	if time.Now().After(cookieItem.Expiration) {
		return nil, fmt.Errorf("cookie expired")
	}

	cookie := &eva.AuthenticationCookie{
		Email:      cookieItem.Email,
		Redeemed:   cookieItem.Redeemed != 0,
		Expiration: cookieItem.Expiration.String(),
		Cookie:     cookieItem.Cookie.String(),
		Session:    cookieItem.Session,
	}

	return cookie, nil
}
