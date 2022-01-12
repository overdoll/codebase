package adapters

import (
	"context"
	"encoding/json"
	"fmt"
	"strconv"

	"github.com/olivere/elastic/v7"
	"github.com/scylladb/gocqlx/v2"
	"github.com/segmentio/ksuid"
	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/localization"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
	"overdoll/libraries/scan"
)

type categoryDocument struct {
	Id                  string            `json:"id"`
	Slug                string            `json:"slug"`
	ThumbnailResourceId string            `json:"thumbnail_resource_id"`
	Title               map[string]string `json:"title"`
	CreatedAt           string            `json:"created_at"`
	TotalLikes          int               `json:"total_likes"`
	TotalPosts          int               `json:"total_posts"`
}

const categoryIndexProperties = `
{
	"id": {
		"type": "keyword"
	},
	"slug": {
		"type": "keyword"
	},
	"thumbnail_resource_id": {
		"type": "keyword"
	},
	"total_likes": {
		"type": "integer"
	},
	"total_posts": {
		"type": "integer"
	},
	"title":  ` + localization.ESIndex + `
	"created_at": {
		"type": "date"
	}
}
`

const categoryIndex = `
{
	"mappings": {
		"dynamic": "strict",
		"properties": ` + categoryIndexProperties + `
	}
}`

const categoryIndexName = "categories"

func marshalCategoryToDocument(cat *post.Category) (*categoryDocument, error) {

	parse, err := ksuid.Parse(cat.ID())

	if err != nil {
		return nil, err
	}

	return &categoryDocument{
		Id:                  cat.ID(),
		Slug:                cat.Slug(),
		ThumbnailResourceId: cat.ThumbnailResourceId(),
		Title:               localization.MarshalTranslationToDatabase(cat.Title()),
		CreatedAt:           strconv.FormatInt(parse.Time().Unix(), 10),
		TotalLikes:          cat.TotalLikes(),
		TotalPosts:          cat.TotalPosts(),
	}, nil
}

func (r PostsIndexElasticSearchRepository) IndexCategory(ctx context.Context, category *post.Category) error {

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
		return fmt.Errorf("failed to index category: %v", err)
	}

	return nil
}

func (r PostsIndexElasticSearchRepository) SearchCategories(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, filter *post.ObjectFilters) ([]*post.Category, error) {

	builder := r.client.Search().
		Index(categoryIndexName).ErrorTrace(true)

	if cursor == nil {
		return nil, fmt.Errorf("cursor must be present")
	}

	var sortingColumn string
	var sortingAscending bool

	if filter.SortBy() == post.NewSort {
		sortingColumn = "created_at"
		sortingAscending = false
	} else if filter.SortBy() == post.TopSort {
		sortingColumn = "total_likes"
		sortingAscending = false
	} else if filter.SortBy() == post.PopularSort {
		sortingColumn = "total_posts"
		sortingAscending = false
	}

	if err := cursor.BuildElasticsearch(builder, sortingColumn, "id", sortingAscending); err != nil {
		return nil, err
	}

	query := elastic.NewBoolQuery()

	if filter.Search() != nil {
		query.Must(
			elastic.
				NewMultiMatchQuery(*filter.Search(), localization.GetESSearchFields("title")...).
				Type("best_fields"),
		)
	}

	if len(filter.Slugs()) > 0 {
		for _, id := range filter.Slugs() {
			query.Filter(elastic.NewTermQuery("slug", id))
		}
	}

	builder.Query(query)

	response, err := builder.Do(ctx)

	if err != nil {
		return nil, fmt.Errorf("failed to search categories: %v", err)
	}

	var cats []*post.Category

	for _, hit := range response.Hits.Hits {

		var pst categoryDocument

		err := json.Unmarshal(hit.Source, &pst)

		if err != nil {
			return nil, fmt.Errorf("failed to unmarshal document: %v", err)
		}

		newCategory := post.UnmarshalCategoryFromDatabase(
			pst.Id,
			pst.Slug,
			pst.Title,
			pst.ThumbnailResourceId,
			pst.TotalLikes,
			pst.TotalPosts,
		)
		newCategory.Node = paging.NewNode(hit.Sort)

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

	err := scanner.RunIterator(ctx, categoryTable, func(iter *gocqlx.Iterx) error {

		var c category

		for iter.StructScan(&c) {

			parse, err := ksuid.Parse(c.Id)

			if err != nil {
				return err
			}

			doc := categoryDocument{
				Id:                  c.Id,
				Slug:                c.Slug,
				ThumbnailResourceId: c.ThumbnailResourceId,
				Title:               c.Title,
				CreatedAt:           strconv.FormatInt(parse.Time().Unix(), 10),
				TotalLikes:          c.TotalLikes,
			}

			_, err = r.client.
				Index().
				Index(categoryIndexName).
				Id(c.Id).
				BodyJson(doc).
				Do(ctx)

			if err != nil {
				return fmt.Errorf("failed to index categories: %v", err)
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

	exists, err := r.client.IndexExists(categoryIndexName).Do(ctx)

	if err != nil {
		return err
	}

	if exists {
		if _, err := r.client.DeleteIndex(categoryIndexName).Do(ctx); err != nil {
			// Handle error
			return err
		}
	}

	if _, err := r.client.CreateIndex(categoryIndexName).BodyString(categoryIndex).Do(ctx); err != nil {
		return err
	}

	return nil
}
