package server

import (
	"context"

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
func (s *Server) IndexCategory(ctx context.Context) {

}