package server

import (
	"context"
	"fmt"
	"github.com/gocql/gocql"
	"github.com/scylladb/gocqlx/v2"
	"github.com/scylladb/gocqlx/v2/qb"
	"log"
	"net"
	"os"
	evav1 "project01101000/codebase/applications/eva/proto"
	"regexp"
	"time"

	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"
)

const (
	defaultPort = "8080"
)

type Server struct {
	session gocqlx.Session
}

type AuthenticationCookie struct {
	Cookie     gocql.UUID
	Email      string
	Redeemed   bool
	Expiration time.Time
}

type RegisteredUser struct {
	Username string
	Email    string
}

type UserEmail struct {
	Username string
	Email    string
}

type User struct {
	Username string
}

var emailRegex = regexp.MustCompile("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$")

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

	evav1.RegisterEvaAPIServer(grpcServer, s)
	reflection.Register(grpcServer)

	log.Printf("Starting Eva server on port %s", port)

	if err := grpcServer.Serve(listener); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
}

func (s *Server) RegisterUser(ctx context.Context, request *evav1.RegisterUserRequest) (*evav1.RegisterUserResponse, error) {
	if request == nil || request.Email == "" {
		return nil, fmt.Errorf("email is not provided")
	}

	if !emailRegex.MatchString(request.Email) {
		return nil, fmt.Errorf("email is not valid")
	}

	if request.Username == "" {
		return nil, fmt.Errorf("username is not provided")
	}

	userEmail := UserEmail{
		Email:    request.Email,
		Username: request.Username,
	}

	// First, we do a unique insert into users_emails
	// This ensures that we capture this email so nobody can use it
	insertUserEmail := qb.Insert("users_emails").
		Columns("email", "username").
		Unique().
		Query(s.session).
		SerialConsistency(gocql.Serial).
		BindStruct(userEmail)

	if err := insertUserEmail.ExecRelease(); err != nil {
		return nil, fmt.Errorf("ExecRelease() failed: '%s", err)
	}

	user := User{
		Username: request.Username,
	}

	// Now, we actually register the user to our main users table, and set any attributes
	insertUser := qb.Insert("users").Columns("user").Unique().Query(s.session).BindStruct(user)

	if err := insertUser.ExecRelease(); err != nil {
		return nil, fmt.Errorf("ExecRelease() failed: '%s", err)
	}

	return &evav1.RegisterUserResponse{Username: request.Username, Email: request.Email}, nil
}

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
	insertCookie := qb.Insert("authentication_cookies").Columns("cookie", "email", "redeemed", "expiration").Query(s.session)

	authCookie := AuthenticationCookie{
		Cookie:   gocql.UUID{},
		Email:    request.Email,
		Redeemed: false,
		// Expires after 5 minutes
		Expiration: time.Now().Add(time.Minute * 5),
	}

	insertCookie.BindStruct(authCookie)

	if err := insertCookie.ExecRelease(); err != nil {
		return nil, fmt.Errorf("ExecRelease() failed: '%s", err)
	}

	cookie := new(evav1.AuthenticationCookie)
	cookie.Email = authCookie.Email
	cookie.Redeemed = authCookie.Redeemed
	cookie.Expiration = authCookie.Expiration.String()

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

	// get authentication cookie with this ID
	authCookie := AuthenticationCookie{
		Cookie:   u,
		Redeemed: true,
	}

	// first check cookie to make sure it's not expired
	queryCookie := qb.Select("authentication_cookies").Where(qb.Eq("cookie")).Columns("expiration").Query(s.session)

	queryCookie.BindStruct(authCookie)

	var queryCookieItem *AuthenticationCookie

	if err := queryCookie.BindStruct(&queryCookieItem); err != nil {
		return nil, fmt.Errorf("select() failed: '%s", err)
	}

	if time.Now().After(queryCookieItem.Expiration) {
		return nil, fmt.Errorf("cookie expired")
	}

	// if not expired, then update cookie
	updateCookie := qb.
		Update("authentication_cookies").
		Set("redeemed").
		Where(qb.Eq("cookie")).
		Query(s.session)

	updateCookie.BindStruct(authCookie)

	var cookieItem *AuthenticationCookie

	if err := queryCookie.BindStruct(&cookieItem); err != nil {
		return nil, fmt.Errorf("update() failed: '%s", err)
	}

	cookie := new(evav1.AuthenticationCookie)
	cookie.Email = cookieItem.Email
	cookie.Redeemed = cookieItem.Redeemed
	cookie.Expiration = cookieItem.Expiration.String()

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

	queryCookie := qb.Select("authentication_cookies").Where(qb.Eq("cookie")).Columns("cookie", "email", "redeemed", "expiration").Query(s.session)

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
	cookie.Redeemed = cookieItem.Redeemed
	cookie.Expiration = cookieItem.Expiration.String()

	return &evav1.GetAuthenticationCookieResponse{Cookie: cookie}, nil
}

func (s *Server) GetRegisteredEmail(ctx context.Context, request *evav1.GetRegisteredEmailRequest) (*evav1.GetRegisteredEmailResponse, error) {
	if request == nil || request.Email == "" {
		return nil, fmt.Errorf("email is not provided")
	}

	if !emailRegex.MatchString(request.Email) {
		return nil, fmt.Errorf("email is not valid")
	}

	// Check for registered user with this email
	resource := RegisteredUser{
		Email: request.Email,
	}

	// check if email is in use
	queryEmail := qb.
		Select("users_emails").
		Columns("email", "username").
		Where(qb.Eq("email")).
		Query(s.session).
		BindStruct(resource)

	var registeredItem *RegisteredUser

	if err := queryEmail.Select(&registeredItem); err != nil {
		return nil, fmt.Errorf("select() failed: '%s", err)
	}

	return &evav1.GetRegisteredEmailResponse{Username: registeredItem.Username}, nil

}
