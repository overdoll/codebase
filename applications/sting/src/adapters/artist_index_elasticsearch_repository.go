package adapters

import (
	"context"
	"fmt"
	"log"

	"overdoll/applications/sting/src/domain/artist"
	"overdoll/libraries/search"
)

type ArtistDocument struct {
	Id       string `json:"id"`
	Avatar   string `json:"avatar"`
	Username string `json:"username"`
}

const ArtistIndex = `
{
	"mappings": {
		"dynamic": "strict",
		"properties": {
			"id": {
				"type": "keyword"
			},
			"avatar": {
				"type": "keyword"
			},
			"username": {
				"type": "text",
				"analyzer": "english"
			}
		}
	}
}`

type ArtistIndexElasticSearchRepository struct {
	store *search.Store
}

func NewArtistIndexElasticSearchRepository(store *search.Store) ArtistIndexElasticSearchRepository {
	return ArtistIndexElasticSearchRepository{store: store}
}

func (r ArtistIndexElasticSearchRepository) BulkIndex(ctx context.Context, artists []*artist.Artist) error {
	err := r.store.CreateBulkIndex("artists")

	if err != nil {
		log.Fatalf("error creating bulk indexer: %s", err)
	}

	// Now we can safely start creating our documents
	for _, art := range artists {

		data := &ArtistDocument{
			Id:       art.ID().String(),
			Avatar:   art.Avatar(),
			Username: art.Username(),
		}

		err = r.store.AddToBulkIndex(data.Id, data)

		if err != nil {
			return fmt.Errorf("unexpected error: %s", err)
		}
	}

	if err := r.store.CloseBulkIndex(); err != nil {
		return fmt.Errorf("unexpected error: %s", err)
	}

	return nil
}

func (r ArtistIndexElasticSearchRepository) DeleteIndex(ctx context.Context) error {
	err := r.store.DeleteIndex("artists")

	if err != nil {

	}

	err = r.store.CreateIndex("artists", ArtistIndex)

	if err != nil {
		return fmt.Errorf("failed to create artists index: %s", err)
	}

	return nil
}
