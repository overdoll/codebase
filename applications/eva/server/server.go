package server

import (
	"context"
	"fmt"
	"log"
	"net"
	"os"
	evav1 "project01101000/codebase/applications/eva/proto"

	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"
)

const (
	defaultPort = "60001"
)

type Server struct {
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

	log.Printf("Starting Books server on port %s", port)
	go func() {
		grpcServer.Serve(listener)
	}()
}

func (s *Server) GetUser(ctx context.Context, in *evav1.GetUserRequest) (*evav1.GetUserResponse, error) {
	if in == nil || in.Id == "" {
		return nil, fmt.Errorf("User id is not provided")
	}

	user := new(evav1.User)

	return &evav1.GetUserResponse{User: user}, nil
}
