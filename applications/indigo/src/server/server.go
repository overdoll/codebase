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

// IndexCategory
func (s *Server) IndexPost(ctx context.Context, msg *indigo.PostIndex) {

}