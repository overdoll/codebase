package server

import (
	"context"
	"log"

	indigo "overdoll/applications/indigo/proto"
	"overdoll/libraries/search"
)

type Server struct {
	store   *search.Store
}

func CreateServer(es *search.Store) *Server {
	return &Server{
		store:   es,
	}
}

// CreateDocument - Creates a document using a json payload
func (s *Server) CreateDocument(ctx context.Context, msg *indigo.CreateDocument) {
	err := s.store.Create(msg.Index, msg.Id, msg.Body)

	if err != nil {
		log.Fatalf("failed to index (%s) new message id: %s : %s", msg.Index, msg.Id, err)
	}
}