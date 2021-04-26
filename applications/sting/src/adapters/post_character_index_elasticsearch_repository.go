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

type CharacterDocument struct {
	Id        string        `json:"id"`
	Thumbnail string        `json:"thumbnail"`
	Name      string        `json:"name"`
	Media     MediaDocument `json:"media"`
}

const CharacterIndex = `
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
			"name": {
				"type": "text",
				"analyzer": "english"
			},
			"media": {
				"type": "nested",
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
		}
	}
}`

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

func MarshalCharacterToDocument(char *post.Character) *CharacterDocument {
	media := char.Media()

	return &CharacterDocument{
		Id:        char.ID(),
		Thumbnail: char.Thumbnail(),
		Name:      char.Name(),
		Media: MediaDocument{
			Id:        media.ID(),
			Thumbnail: media.Thumbnail(),
			Title:     media.Title(),
		},
	}
}

func (r PostIndexElasticSearchRepository) BulkIndexCharacters(ctx context.Context, characters []*post.Character) error {

	err := r.store.CreateBulkIndex("characters")

	if err != nil {
		return fmt.Errorf("error creating bulk indexer: %s", err)
	}

	// Now we can safely start creating our documents
	for _, char := range characters {

		data := MarshalCharacterToDocument(char)

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

func (r PostIndexElasticSearchRepository) DeleteIndexCharacters(ctx context.Context) error {
	err := r.store.DeleteIndex("characters")

	if err != nil {

	}

	err = r.store.CreateIndex("characters", CharacterIndex)

	if err != nil {
		return fmt.Errorf("failed to create character index: %s", err)
	}

	return nil
}

func (r PostIndexElasticSearchRepository) DeleteIndexMedia(ctx context.Context) error {
	err := r.store.DeleteIndex("media")

	if err != nil {

	}

	err = r.store.CreateIndex("media", MediaIndex)

	if err != nil {
		return fmt.Errorf("failed to create media index: %s", err)
	}

	return nil
}
