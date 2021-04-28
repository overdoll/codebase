package adapters

import (
	"context"
	"fmt"

	"overdoll/applications/sting/src/domain/post"
)

type MediaDocument struct {
	Id        string `json:"id"`
	Thumbnail string `json:"thumbnail"`
	Title     string `json:"title"`
}

const MediaIndex = `
{
	"mappings": {
		"dynamic": "strict",
		"properties": {
			"id": {
				"type": "keyword"
			},
			"thumbnail": {
				"type": "keyword"
			},
			"title": {
				"type": "text",
				"analyzer": "english"
			}
		}
	}
}`

func (r PostIndexElasticSearchRepository) BulkIndexMedia(ctx context.Context, media []*post.Media) error {

	err := r.store.CreateBulkIndex("media")

	if err != nil {
		return fmt.Errorf("error creating bulk indexer: %s", err)
	}

	// Now we can safely start creating our documents
	for _, med := range media {

		data := &MediaDocument{
			Id:        med.ID(),
			Thumbnail: med.Thumbnail(),
			Title:     med.Title(),
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

func (r PostIndexElasticSearchRepository) DeleteCharacterIndex(ctx context.Context) error {
	err := r.store.DeleteIndex("characters")

	if err != nil {

	}

	err = r.store.CreateIndex("characters", CharacterIndex)

	if err != nil {
		return fmt.Errorf("failed to create character index: %s", err)
	}

	return nil
}

func (r PostIndexElasticSearchRepository) DeleteMediaIndex(ctx context.Context) error {
	err := r.store.DeleteIndex("media")

	if err != nil {

	}

	err = r.store.CreateIndex("media", MediaIndex)

	if err != nil {
		return fmt.Errorf("failed to create media index: %s", err)
	}

	return nil
}
