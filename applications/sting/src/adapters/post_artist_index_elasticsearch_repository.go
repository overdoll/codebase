package adapters

import (
	"context"
	"fmt"
	"log"

	"overdoll/applications/sting/src/domain/post"
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

func (r PostIndexElasticSearchRepository) BulkIndex(ctx context.Context, artists []*post.Artist) error {
	err := r.store.CreateBulkIndex("artists")

	if err != nil {
		log.Fatalf("error creating bulk indexer: %s", err)
	}

	// Now we can safely start creating our documents
	for _, art := range artists {

		data := &ArtistDocument{
			Id:       art.ID(),
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

func (r PostIndexElasticSearchRepository) DeleteIndex(ctx context.Context) error {
	err := r.store.DeleteIndex("artists")

	if err != nil {

	}

	err = r.store.CreateIndex("artists", ArtistIndex)

	if err != nil {
		return fmt.Errorf("failed to create artists index: %s", err)
	}

	return nil
}
