package adapters

import (
	"context"
	"fmt"

	"overdoll/applications/sting/src/domain/character"
	"overdoll/libraries/search"
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

type CharacterIndexElasticSearchRepository struct {
	store *search.Store
}

func NewCharacterIndexElasticSearchRepository(store *search.Store) CharacterIndexElasticSearchRepository {
	return CharacterIndexElasticSearchRepository{store: store}
}

func (r CharacterIndexElasticSearchRepository) BulkIndexCharacters(ctx context.Context, characters []*character.Character) error {

	err := r.store.CreateBulkIndex("characters")

	if err != nil {
		return fmt.Errorf("error creating bulk indexer: %s", err)
	}

	// Now we can safely start creating our documents
	for _, char := range characters {

		media := char.Media()

		data := &CharacterDocument{
			Id:        char.ID().String(),
			Thumbnail: char.Thumbnail(),
			Name:      char.Name(),
			Media: MediaDocument{
				Id:        media.ID().String(),
				Thumbnail: media.Thumbnail(),
				Title:     media.Title(),
			},
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

func (r CharacterIndexElasticSearchRepository) BulkIndexMedia(ctx context.Context, media []*character.Media) error {

	err := r.store.CreateBulkIndex("media")

	if err != nil {
		return fmt.Errorf("error creating bulk indexer: %s", err)
	}

	// Now we can safely start creating our documents
	for _, med := range media {

		data := &MediaDocument{
			Id:        med.ID().String(),
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

func (r CharacterIndexElasticSearchRepository) DeleteIndexCharacters(ctx context.Context) error {
	err := r.store.DeleteIndex("characters")

	if err != nil {

	}

	err = r.store.CreateIndex("characters", CharacterIndex)

	if err != nil {
		return fmt.Errorf("failed to create character index: %s", err)
	}

	return nil
}

func (r CharacterIndexElasticSearchRepository) DeleteIndexMedia(ctx context.Context) error {
	err := r.store.DeleteIndex("media")

	if err != nil {

	}

	err = r.store.CreateIndex("media", MediaIndex)

	if err != nil {
		return fmt.Errorf("failed to create media index: %s", err)
	}

	return nil
}