package server

import (
	"context"
	"log"

	"github.com/scylladb/gocqlx/v2"
	indigo "overdoll/applications/indigo/proto"
	"overdoll/applications/indigo/src/search/documents"
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
	err := s.store.Create("category", msg.Id, &documents.Category{
		Id:        msg.Id,
		Thumbnail: msg.Thumbnail,
		Title:     msg.Title,
	})

	if err != nil {
		log.Fatalf("failed to index new category: %s", err)
	}
}

func (s *Server) IndexMedia(ctx context.Context, msg *indigo.MediaIndex) {
	err := s.store.Create("media", msg.Id, &documents.Media{
		Id:        msg.Id,
		Thumbnail: msg.Thumbnail,
		Title:     msg.Title,
	})

	if err != nil {
		log.Fatalf("failed to index new media: %s", err)
	}
}

func (s *Server) IndexCharacter(ctx context.Context, msg *indigo.CharacterIndex) {
	err := s.store.Create("character", msg.Id, &documents.Character{
		Id:        msg.Id,
		Thumbnail: msg.Thumbnail,
		Name:      msg.Name,
		Media: documents.Media{
			Id:        msg.Media.Id,
			Thumbnail: msg.Media.Thumbnail,
			Title:     msg.Media.Title,
		},
	})

	if err != nil {
		log.Fatalf("failed to index new character: %s", err)
	}
}
