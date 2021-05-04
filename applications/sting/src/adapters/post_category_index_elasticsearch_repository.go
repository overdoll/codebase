package adapters

import (
	"context"
	"encoding/json"
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

const SearchCategories = `
	"query" : {
		"multi_match" : {
			"query" : %q,
			"fields" : ["title^100"],
			"operator" : "and"
		}
	},
	"size" : 5`

const AllCategories = `
	"query" : { "match_all" : {} },
	"size" : 5`

const CategoryIndexName = "categories"

func MarshalCategoryToDocument(cat *post.Category) *CategoryDocument {
	return &CategoryDocument{
		Id:        cat.ID(),
		Thumbnail: cat.RawThumbnail(),
		Title:     cat.Title(),
	}
}

func (r PostIndexElasticSearchRepository) SearchCategories(ctx context.Context, search string) ([]*post.Category, error) {
	var query string

	if search == "" {
		query = AllCategories
	} else {
		query = fmt.Sprintf(SearchCategories, search)
	}

	response, err := r.store.Search(CategoryIndexName, query)

	if err != nil {
		return nil, err
	}

	var cats []*post.Category

	for _, cat := range response.Hits {

		var pst *post.Category

		err := json.Unmarshal(cat, pst)

		if err != nil {
			continue
		}

		cats = append(cats, pst)
	}

	return cats, nil
}

func (r PostIndexElasticSearchRepository) BulkIndexCategories(ctx context.Context, categories []*post.Category) error {

	err := r.store.CreateBulkIndex(CategoryIndexName)

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
	err := r.store.DeleteIndex(CategoryIndexName)

	if err != nil {

	}

	err = r.store.CreateIndex(CategoryIndexName, CategoryIndex)

	if err != nil {
		return fmt.Errorf("failed to create category index: %s", err)
	}

	return nil
}
