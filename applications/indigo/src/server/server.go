package server

import (
	"context"
	indigo "overdoll/applications/indigo/proto"
	"github.com/elastic/go-elasticsearch/v7"
)

type Server struct {
	elasticsearch  *elasticsearch.Client
}

func CreateServer(es *elasticsearch.Client) *Server {
	return &Server{
		elasticsearch:  es,
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