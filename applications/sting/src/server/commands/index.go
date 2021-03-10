package commands

import (
	"log"

	"github.com/scylladb/gocqlx/v2"
	"github.com/scylladb/gocqlx/v2/qb"
	"overdoll/applications/sting/src/models"
	"overdoll/applications/sting/src/search/documents"
	"overdoll/applications/sting/src/search/indexes"
	"overdoll/libraries/search"
)

type Server struct {
	session gocqlx.Session
	store   *search.Store
}

func CreateServer(session gocqlx.Session, store *search.Store) *Server {
	return &Server{
		session: session,
		store:   store,
	}
}

func (s *Server) IndexCharacters() {
	err := s.store.CreateIndex("characters", indexes.CharacterIndex)

	if err != nil {
		log.Fatalf("failed to create characters index: %s", err)
	}

	err = s.store.CreateBulkIndex("characters")

	if err != nil {
		log.Fatalf("error creating bulk indexer: %s", err)
	}

	var dbChars []models.Character

	// Grab all of our characters
	// Doing a direct database query
	qc := qb.Select("characters").Columns("id", "media_id", "name", "thumbnail").Query(s.session)

	if err = qc.Select(&dbChars); err != nil {
		log.Fatalf("select() failed: %s", err)
	}

	var medias []models.Media

	// Go through each character and grab the media ID, since we need this for the character document
	for _, char := range dbChars {
		medias = append(medias, models.Media{Id: char.MediaId})
	}

	// Get all the medias through a direct database query
	qm := qb.Select("media").Columns("id", "thumbnail", "title").Query(s.session)

	if err = qm.Select(&medias); err != nil {
		log.Fatalf("select() failed: %s", err)
	}

	// Now we can safely start creating our documents
	for _, character := range dbChars {

		var media models.Media

		for _, med := range medias {
			if med.Id == character.MediaId {
				media = med
			}
		}

		data := &documents.Character{
			Id:        character.Id.String(),
			Thumbnail: character.Thumbnail,
			Name:      character.Name,
			Media: documents.Media{
				Id:        media.Id.String(),
				Thumbnail: media.Thumbnail,
				Title:     media.Title,
			},
		}

		err = s.store.AddToBulkIndex(data.Id, data)

		if err != nil {
			log.Fatalf("unexpected error: %s", err)
		}
	}

	if err := s.store.CloseBulkIndex(); err != nil {
		log.Fatalf("unexpected error: %s", err)
	}
}

func (s *Server) IndexMedia() {
	err := s.store.CreateIndex("media", indexes.MediaIndex)

	if err != nil {
		log.Fatalf("failed to create media index: %s", err)
	}

	err = s.store.CreateBulkIndex("media")

	if err != nil {
		log.Fatalf("error creating bulk indexer: %s", err)
	}

	var dbMed []models.Media

	qc := qb.Select("media").Columns("id", "title", "thumbnail").Query(s.session)

	if err = qc.Select(&dbMed); err != nil {
		log.Fatalf("select() failed: %s", err)
	}

	// Now we can safely start creating our documents
	for _, media := range dbMed {

		data := &documents.Media{
			Id:        media.Id.String(),
			Thumbnail: media.Thumbnail,
			Title:     media.Title,
		}

		err = s.store.AddToBulkIndex(data.Id, data)

		if err != nil {
			log.Fatalf("unexpected error: %s", err)
		}
	}

	if err := s.store.CloseBulkIndex(); err != nil {
		log.Fatalf("unexpected error: %s", err)
	}
}

func (s *Server) IndexCategories() {
	err := s.store.CreateIndex("categories", indexes.CategoryIndex)

	if err != nil {
		log.Fatalf("failed to create category index: %s", err)
	}

	err = s.store.CreateBulkIndex("categories")

	if err != nil {
		log.Fatalf("error creating bulk indexer: %s", err)
	}

	var dbCat []models.Category

	qc := qb.Select("categories").Columns("id", "title", "thumbnail").Query(s.session)

	if err = qc.Select(&dbCat); err != nil {
		log.Fatalf("select() failed: %s", err)
	}

	// Now we can safely start creating our documents
	for _, category := range dbCat {

		data := &documents.Category{
			Id:        category.Id.String(),
			Thumbnail: category.Thumbnail,
			Title:     category.Title,
		}

		err = s.store.AddToBulkIndex(data.Id, data)

		if err != nil {
			log.Fatalf("unexpected error: %s", err)
		}
	}

	if err := s.store.CloseBulkIndex(); err != nil {
		log.Fatalf("unexpected error: %s", err)
	}
}
