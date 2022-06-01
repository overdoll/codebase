package adapters

import (
	"context"
	"encoding/json"
	"overdoll/libraries/errors"
	"overdoll/libraries/support"
	"overdoll/libraries/uuid"
	"strconv"

	"github.com/olivere/elastic/v7"
	"github.com/scylladb/gocqlx/v2"
	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/localization"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
	"overdoll/libraries/scan"
)

type categoryDocument struct {
	Id                  string            `json:"id"`
	Slug                string            `json:"slug"`
	ThumbnailResourceId *string           `json:"thumbnail_resource_id"`
	Title               map[string]string `json:"title"`
	CreatedAt           string            `json:"created_at"`
	TotalLikes          int               `json:"total_likes"`
	TotalPosts          int               `json:"total_posts"`
}

const CategoryIndexName = "categories"

func marshalCategoryToDocument(cat *post.Category) (*categoryDocument, error) {

	parse, err := uuid.Parse(cat.ID())

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

func (r PostsCassandraElasticsearchRepository) indexCategory(ctx context.Context, category *post.Category) error {

	cat, err := marshalCategoryToDocument(category)

	if err != nil {
		return err
	}

	_, err = r.client.
		Index().
		Index(CategoryIndexName).
		Id(category.ID()).
		BodyJson(cat).
		Do(ctx)

	if err != nil {
		return errors.Wrap(support.ParseElasticError(err), "failed to index category")
	}

	return nil
}

func (r PostsCassandraElasticsearchRepository) SearchCategories(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, filter *post.ObjectFilters) ([]*post.Category, error) {

	builder := r.client.Search().
		Index(CategoryIndexName).ErrorTrace(true)

	if cursor == nil {
		return nil, paging.ErrCursorNotPresent
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
		return nil, errors.Wrap(support.ParseElasticError(err), "failed to search categories")
	}

	var cats []*post.Category

	for _, hit := range response.Hits.Hits {

		var pst categoryDocument

		err := json.Unmarshal(hit.Source, &pst)

		if err != nil {
			return nil, errors.Wrap(err, "failed to unmarshal category document")
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

func (r PostsCassandraElasticsearchRepository) IndexAllCategories(ctx context.Context) error {

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

			parse, err := uuid.Parse(c.Id)

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
				Index(CategoryIndexName).
				Id(c.Id).
				BodyJson(doc).
				Do(ctx)

			if err != nil {
				return errors.Wrap(support.ParseElasticError(err), "failed to index categories")
			}
		}

		return nil
	})

	if err != nil {
		return err
	}

	return nil
}
