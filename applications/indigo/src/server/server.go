package server

import (
	"context"
	"github.com/scylladb/gocqlx/v2"
	indigo "overdoll/applications/indigo/proto"
	"github.com/elastic/go-elasticsearch/v7"
)

type Server struct {
	elasticsearch  *elasticsearch.Client
	session gocqlx.Session
}

func CreateServer(es *elasticsearch.Client, ss gocqlx.Session) *Server {
	return &Server{
		elasticsearch:  es,
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