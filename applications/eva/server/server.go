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
	ID         gocql.UUID
	Email      string
	Redeemed   bool
	Expiration time.Time
}

type RegisteredUser struct {
	Username string
	Email    string
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
		ID:       gocql.UUID{},
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

func (s *Server) GetAuthenticationCookie(ctx context.Context, request *evav1.GetAuthenticationCookieRequest) (*evav1.GetAuthenticationCookieResponse, error) {
	if request == nil || request.Cookie == "" {
		return nil, fmt.Errorf("cookie is not provided")
	}

	u, err := gocql.ParseUUID(request.Cookie)

	if err != nil {
		return nil, fmt.Errorf("uuid is not valid")
	}

	queryCookie := qb.Select("authentication_cookies").Columns("cookie", "email", "redeemed", "expiration").Query(s.session)

	// get authentication cookie with this ID
	authCookie := AuthenticationCookie{
		ID: u,
	}

	queryCookie.BindStruct(authCookie)

	var cookieItem *AuthenticationCookie

	if err := queryCookie.Select(&cookieItem); err != nil {
		return nil, fmt.Errorf("select() failed: '%s", err)
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
