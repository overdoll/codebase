package server

import (
	"context"

	"github.com/scylladb/gocqlx/v2"
	sting "overdoll/applications/sting/proto"
)

type Server struct {
	session gocqlx.Session
}

func CreateServer(session gocqlx.Session) *Server {
	return &Server{
		session: session,
	}
}

func (s *Server) CreatePost(context.Context, *sting.CreatePostRequest) (*sting.Post, error) {
	return nil, nil
}