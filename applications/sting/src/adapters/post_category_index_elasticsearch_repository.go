package adapters

import (
	"context"
	"encoding/json"
	"errors"
	"strconv"

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

	for _, category := range categories {

		cat, err := marshalCategoryToDocument(category)

		if err != nil {
			return err
		}

		_, err = r.client.
			Index().
			Index(categoryIndexName).
			Id(category.ID()).
			BodyJson(cat).
			Do(ctx)

		if err != nil {
			return err
		}
	}

	return nil
}

func (r PostsIndexElasticSearchRepository) SearchCategories(ctx context.Context, cursor *paging.Cursor, search string) ([]*post.Category, error) {

	builder := r.client.Search().
		Index(categoryIndexName).ErrorTrace(true)

	if cursor == nil {
		return nil, errors.New("cursor required")
	}

	query := cursor.BuildElasticsearch(builder, "created_at")

	builder.Query(query)

	response, err := builder.Do(ctx)

	if err != nil {
		return nil, err
	}

	var cats []*post.Category

	for _, hit := range response.Hits.Hits {

		var pst categoryDocument

		err := json.Unmarshal(hit.Source, &pst)

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

			doc := categoryDocument{
				Id:        c.Id,
				Thumbnail: c.Thumbnail,
				Title:     c.Title,
				CreatedAt: strconv.FormatInt(parse.Time().Unix(), 10),
			}

			_, err = r.client.
				Index().
				Index(categoryIndexName).
				Id(c.Id).
				BodyJson(doc).
				Do(ctx)

			if err != nil {
				return err
			}
		}

		return nil
	})

	if err != nil {
		return err
	}

	return nil
}

func (r PostsIndexElasticSearchRepository) DeleteCategoryIndex(ctx context.Context) error {

	if _, err := r.client.DeleteIndex(categoryIndexName).Do(ctx); err != nil {
		// Handle error
		return err
	}

	if _, err := r.client.CreateIndex(categoryIndexName).BodyString(categoryIndex).Do(ctx); err != nil {
		return err
	}

	return nil
}
