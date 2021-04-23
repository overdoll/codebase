package command

import (
	"context"

	"github.com/scylladb/gocqlx/v2/qb"
	"overdoll/applications/hades/src/models"
)

type IndexArtistsHandler struct {
}

func NewIndexArtistsHandler() IndexArtistsHandler {
	return IndexArtistsHandler{}
}

func (h IndexArtistsHandler) Handle(ctx context.Context) error {
	err := s.store.DeleteIndex("artists")

	// In case it fails, we don't care since it should still create it
	if err != nil {

	}

	err = s.store.CreateIndex("artists", indexes.ArtistIndex)

	if err != nil {
		log.Fatalf("failed to create media index: %s", err)
	}

	err = s.store.CreateBulkIndex("artists")

	if err != nil {
		log.Fatalf("error creating bulk indexer: %s", err)
	}

	var dbArtists []models.Artist

	qc := qb.Select("artists").Columns("user_id", "user_username", "user_avatar").Query(s.session)

	if err = qc.Select(&dbArtists); err != nil {
		log.Fatalf("select() failed: %s", err)
	}

	// Now we can safely start creating our documents
	for _, artist := range dbArtists {

		data := &documents.Artist{
			Id:       artist.Id.String(),
			Avatar:   artist.Avatar.URL,
			Username: artist.Username,
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
