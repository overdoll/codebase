package command

import (
	"context"

	"github.com/scylladb/gocqlx/v2/qb"
	"overdoll/applications/hades/src/models"
)

type IndexCharactersHandler struct {
}

func NewIndexCharactersHandler() IndexCharactersHandler {
	return IndexCharactersHandler{}
}

func (h IndexCharactersHandler) Handle(ctx context.Context) error {

	err := s.store.DeleteIndex("characters")

	// In case it fails, we don't care since it should still create it
	if err != nil {

	}

	err = s.store.CreateIndex("characters", indexes.CharacterIndex)

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
			Thumbnail: character.Thumbnail.URL,
			Name:      character.Name,
			Media: documents.Media{
				Id:        media.Id.String(),
				Thumbnail: media.Thumbnail.URL,
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
