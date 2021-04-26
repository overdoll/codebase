package adapters

import (
	"context"
	"fmt"

	"overdoll/applications/sting/src/domain/post"
)

type CategoryDocument struct {
	Id        string `json:"id"`
	Thumbnail string `json:"thumbnail"`
	Title     string `json:"title"`
}

const CategoryIndex = `
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

func MarshalCategoryToDocument(cat *post.Category) *CategoryDocument {
	return &CategoryDocument{
		Id:        cat.ID().String(),
		Thumbnail: cat.Thumbnail(),
		Title:     cat.Title(),
	}
}

func (r PostIndexElasticSearchRepository) BulkIndexCategories(ctx context.Context, categories []*post.Category) error {

	err := r.store.CreateBulkIndex("categories")

	if err != nil {
		return fmt.Errorf("error creating bulk indexer: %s", err)
	}

	// Now we can safely start creating our documents
	for _, cat := range categories {

		data := MarshalCategoryToDocument(cat)

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

func (r PostIndexElasticSearchRepository) DeleteCategoryIndex(ctx context.Context) error {
	err := r.store.DeleteIndex("categories")

	if err != nil {

	}

	err = r.store.CreateIndex("categories", CategoryIndex)

	if err != nil {
		return fmt.Errorf("failed to create category index: %s", err)
	}

	return nil
}
