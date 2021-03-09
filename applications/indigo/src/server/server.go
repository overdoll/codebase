package server

import (
	"context"

	"github.com/scylladb/gocqlx/v2"
	indigo "overdoll/applications/indigo/proto"
	"overdoll/libraries/search"
)

type Server struct {
	store   *search.Store
	session gocqlx.Session
}

func CreateServer(es *search.Store, ss gocqlx.Session) *Server {
	return &Server{
		store:   es,
		session: ss,
	}
}

func (s *Server) IndexPost(ctx context.Context, msg *indigo.PostIndex) {

}

func (s *Server) IndexCategory(ctx context.Context, msg *indigo.CategoryIndex) {

}

func (s *Server) IndexMedia(ctx context.Context, msg *indigo.MediaIndex) {

}

func (s *Server) IndexCharacter(ctx context.Context, msg *indigo.CharacterIndex) {

}
