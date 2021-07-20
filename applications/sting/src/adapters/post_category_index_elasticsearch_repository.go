package adapters

import (
	"context"
	"encoding/json"
	"fmt"

	"overdoll/applications/sting/src/domain/post"
	"overdoll/libraries/paging"
)

type categoryDocument struct {
	Id        string `json:"id"`
	Thumbnail string `json:"thumbnail"`
	Title     string `json:"title"`
}

const categoryIndex = `
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

const searchCategories = `
	"query" : {
		"multi_match" : {
			"query" : %q,
			"fields" : ["title^100"],
			"operator" : "and"
		}
	},
	"size" : 5`

const allCategories = `
	"query" : { "match_all" : {} },
	"size" : 5`

const categoryIndexName = "categories"

func MarshalCategoryToDocument(cat *post.Category) *categoryDocument {
	return &categoryDocument{
		Id:        cat.ID(),
		Thumbnail: cat.RawThumbnail(),
		Title:     cat.Title(),
	}
}

func (r PostsIndexElasticSearchRepository) SearchCategories(ctx context.Context, cursor *paging.Cursor, search string) ([]*post.Category, *paging.Info, error) {
	var query string

	if search == "" {
		query = allCategories
	} else {
		query = fmt.Sprintf(searchCategories, search)
	}

	response, err := r.store.Search(categoryIndexName, query)

	if err != nil {
		return nil, nil, err
	}

	var cats []*post.Category

	for _, cat := range response.Hits {

		var pst categoryDocument

		err := json.Unmarshal(cat, &pst)

		if err != nil {
			return nil, nil, err
		}

		newCategory := post.UnmarshalCategoryFromDatabase(pst.Id, pst.Title, pst.Thumbnail)
		newCategory.Node = paging.NewNode(pst.Id)

		cats = append(cats, newCategory)
	}

	return cats, nil, nil
}

func (r PostsIndexElasticSearchRepository) BulkIndexCategories(ctx context.Context, categories []*post.Category) error {

	err := r.store.CreateBulkIndex(categoryIndexName)

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

func (r PostsIndexElasticSearchRepository) DeleteCategoryIndex(ctx context.Context) error {
	err := r.store.DeleteIndex(categoryIndexName)

	if err != nil {

	}

	err = r.store.CreateIndex(categoryIndexName, categoryIndex)

	if err != nil {
		return fmt.Errorf("failed to create category index: %s", err)
	}

	return nil
}
