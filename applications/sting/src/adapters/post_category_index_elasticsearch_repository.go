package adapters

import (
	"bytes"
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"strconv"
	"strings"
	"text/template"

	"github.com/scylladb/gocqlx/v2"
	"github.com/segmentio/ksuid"
	"overdoll/applications/sting/src/domain/post"
	"overdoll/libraries/paging"
	"overdoll/libraries/scan"
)

type categoryDocument struct {
	Id        string `json:"id"`
	Thumbnail string `json:"thumbnail"`
	Title     string `json:"title"`
	CreatedAt string `json:"created_at"`
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
			},
			"created_at": {
				"type": "date"
			}
		}
	}
}`

const searchCategories = `	
    "query" : {
		"bool": {
			"must": [
				{{.Cursor}}
			]
		}
	},
	{{.Size}}
    {{.Sort}}
	"track_total_hits": true
`

const categoryIndexName = "categories"

func marshalCategoryToDocument(cat *post.Category) (*categoryDocument, error) {

	parse, err := ksuid.Parse(cat.ID())

	if err != nil {
		return nil, err
	}

	return &categoryDocument{
		Id:        cat.ID(),
		Thumbnail: cat.Thumbnail(),
		Title:     cat.Title(),
		CreatedAt: strconv.FormatInt(parse.Time().Unix(), 10),
	}, nil
}

func (r PostsIndexElasticSearchRepository) IndexCategories(ctx context.Context, categories []*post.Category) error {

	if err := r.store.CreateBulkIndex(categoryIndexName); err != nil {
		return err
	}

	for _, category := range categories {

		cat, err := marshalCategoryToDocument(category)

		if err != nil {
			return err
		}

		if err := r.store.AddToBulkIndex(ctx, category.ID(), cat); err != nil {
			return err
		}
	}

	if err := r.store.CloseBulkIndex(ctx); err != nil {
		return fmt.Errorf("unexpected error: %s", err)
	}

	return nil
}

func (r PostsIndexElasticSearchRepository) SearchCategories(ctx context.Context, cursor *paging.Cursor, search string) ([]*post.Category, error) {

	t, err := template.New("searchCategory").Parse(searchCategories)

	if err != nil {
		return nil, err
	}

	if cursor == nil {
		return nil, errors.New("cursor required")
	}

	curse, sort, count := cursor.BuildElasticsearch("created_at")

	data := struct {
		Cursor string
		Sort   string
		Size   string
	}{
		Size:   count,
		Sort:   sort,
		Cursor: strings.TrimRight(curse, ","),
	}

	var query bytes.Buffer

	if err := t.Execute(&query, data); err != nil {
		return nil, err
	}

	response, err := r.store.Search(categoryIndexName, query.String())

	if err != nil {
		return nil, err
	}

	var cats []*post.Category

	for _, cat := range response.Hits {

		var pst categoryDocument

		err := json.Unmarshal(cat, &pst)

		if err != nil {
			return nil, err
		}

		newCategory := post.UnmarshalCategoryFromDatabase(pst.Id, pst.Title, pst.Thumbnail)
		newCategory.Node = paging.NewNode(pst.CreatedAt)

		cats = append(cats, newCategory)
	}

	return cats, nil
}

func (r PostsIndexElasticSearchRepository) IndexAllCategories(ctx context.Context) error {

	if err := r.store.CreateBulkIndex(categoryIndexName); err != nil {
		return err
	}

	scanner := scan.New(r.session,
		scan.Config{
			NodesInCluster: 1,
			CoresInNode:    2,
			SmudgeFactor:   3,
		},
	)

	err := scanner.RunIterator(categoryTable, func(iter *gocqlx.Iterx) error {

		var c category

		for iter.StructScan(&c) {

			parse, err := ksuid.Parse(c.Id)

			if err != nil {
				return err
			}

			if err := r.store.AddToBulkIndex(ctx, c.Id, categoryDocument{
				Id:        c.Id,
				Thumbnail: c.Thumbnail,
				Title:     c.Title,
				CreatedAt: strconv.FormatInt(parse.Time().Unix(), 10),
			}); err != nil {
				return err
			}
		}

		return nil
	})

	if err != nil {
		return err
	}

	if err := r.store.CloseBulkIndex(ctx); err != nil {
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
