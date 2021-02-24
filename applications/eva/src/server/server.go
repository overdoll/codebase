package server

import (
	"context"
	"fmt"
	"log"
	"net"
	"os"
	"strings"
	"time"

	"github.com/gocql/gocql"
	"github.com/scylladb/gocqlx/v2"
	"github.com/scylladb/gocqlx/v2/qb"
	eva "overdoll/applications/eva/proto"
	"overdoll/applications/eva/src/models"

	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"
)

const (
	defaultPort = "8080"
)

type Server struct {
	session gocqlx.Session
}

func NewServer(ctx context.Context, session gocqlx.Session) (*Server, error) {
	return &Server{
		session: session,
	}, nil
}

func (s *Server) Run() {
	port := os.Getenv("APP_PORT")

	if port == "" {
		port = defaultPort
	}

	listener, err := net.Listen("tcp", fmt.Sprintf("0.0.0.0:%s", port))
	if err != nil {
		log.Fatal("net.Listen failed")
		return
	}
	grpcServer := grpc.NewServer()

	eva.RegisterEvaAPIServer(grpcServer, s)
	reflection.Register(grpcServer)

	log.Printf("Starting Eva server on port %s", port)

	if err := grpcServer.Serve(listener); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
}

func (s *Server) GetUser(ctx context.Context, request *eva.GetUserRequest) (*eva.User, error) {

	u, err := gocql.ParseUUID(request.Id)

	if err != nil {
		return nil, fmt.Errorf("uuid is not valid")
	}

	users := models.User{
		Id: u,
	}

	queryUser := qb.Select("users").
		Where(qb.Eq("id")).
		Query(s.session).
		BindStruct(users)

	var userItem models.User

	if err := queryUser.Get(&userItem); err != nil {
		return nil, fmt.Errorf("select() failed: '%s", err)
	}

	return &eva.User{Username: userItem.Username, Id: userItem.Id.String()}, nil
}

func (s *Server) RegisterUser(ctx context.Context, request *eva.RegisterUserRequest) (*eva.User, error) {

	userId := gocql.TimeUUID()

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

	return &eva.User{Username: request.Username, Id: user.Id.String()}, nil
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

	var registeredItem models.UserEmail

	if err := queryEmail.Get(&registeredItem); err != nil {
		return &eva.User{Username: "", Id: ""}, nil
	}

	// Get our user using the User Id
	user, err := s.GetUser(ctx, &eva.GetUserRequest{Id: registeredItem.UserId.String()})

	if err != nil {
		return nil, err
	}

	return user, nil
}

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
		Email:      authCookie.Email,
		Redeemed:   authCookie.Redeemed != 0,
		Expiration: authCookie.Expiration.String(),
		Cookie:     authCookie.Cookie.String(),
		Session:    authCookie.Session,
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

	cookie := &eva.AuthenticationCookie{
		Email:      cookieItem.Email,
		Redeemed:   cookieItem.Redeemed != 0,
		Expiration: cookieItem.Expiration.String(),
		Cookie:     cookieItem.Cookie.String(),
		Session:    cookieItem.Session,
	}

	return cookie, nil
}
