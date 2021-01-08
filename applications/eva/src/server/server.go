package server

import (
	"context"
	"fmt"
	"log"
	"net"
	"os"
	"time"

	"github.com/gocql/gocql"
	"github.com/scylladb/gocqlx/v2"
	evav1 "project01101000/codebase/applications/eva/proto"

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
	Cookie     gocql.UUID `db:"cookie"`
	Email      string     `db:"email"`
	Redeemed   int        `db:"redeemed"`
	Expiration time.Time  `db:"expiration"`
}

type RegisteredUser struct {
	Username string `db:"username"`
	Email    string `db:"email"`
}

type UserEmail struct {
	Username string     `db:"username"`
	Email    string     `db:"email"`
	UserId   gocql.UUID `db:"user_id"`
}

type User struct {
	Id       gocql.UUID `db:"id"`
	Username string     `db:"username"`
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

	evav1.RegisterEvaAPIServer(grpcServer, s)
	reflection.Register(grpcServer)

	log.Printf("Starting Eva server on port %s", port)

	if err := grpcServer.Serve(listener); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
}
