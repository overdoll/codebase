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
	go func() {
		grpcServer.Serve(listener)
	}()
}

func (s *Server) CreateAuthenticationCookie(ctx context.Context, session gocqlx.Session, request *evav1.GetAuthenticationCookieRequest) (*evav1.GetAuthenticationCookieResponse, error) {
	if request == nil || request.Email == "" {
		return nil, fmt.Errorf("email is not provided")
	}

	if !emailRegex.MatchString(request.Email) {
		return nil, fmt.Errorf("email is not valid")
	}

	// run a query to create the authentication token
	insertCookie := qb.Insert("authentication_cookies").Columns("cookie", "email", "redeemed", "expiration").Query(session)

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

	return &evav1.GetAuthenticationCookieResponse{Cookie: cookie}, nil
}
