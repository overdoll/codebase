package adapters

import (
	"context"
	"encoding/json"
	"go.uber.org/zap"
	"overdoll/libraries/cache"
	"overdoll/libraries/database"
	"overdoll/libraries/errors"
	"overdoll/libraries/media"
	"overdoll/libraries/support"
	"time"

	"github.com/olivere/elastic/v7"
	"github.com/scylladb/gocqlx/v2"
	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/localization"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
)

type categoryDocument struct {
	Id                string              `json:"id"`
	Slug              string              `json:"slug"`
	TopicId           *string             `json:"topic_id"`
	AlternativeTitles []map[string]string `json:"alternative_titles"`
	ThumbnailResource string              `json:"thumbnail_resource"`
	BannerResource    string              `json:"banner_resource"`
	BannerMedia       *string             `json:"banner_media"`
	Title             map[string]string   `json:"title"`
	CreatedAt         time.Time           `json:"created_at"`
	UpdatedAt         time.Time           `json:"updated_at"`
	TotalLikes        int                 `json:"total_likes"`
	TotalPosts        int                 `json:"total_posts"`
}

const CategoryIndexName = "categories"

var CategoryReaderIndex = cache.ReadAlias(CachePrefix, CategoryIndexName)
var categoryWriterIndex = cache.WriteAlias(CachePrefix, CategoryIndexName)

func marshalCategoryToDocument(cat *post.Category) (*categoryDocument, error) {

	marshalledBanner, err := media.MarshalMediaToDatabase(cat.BannerMedia())

	if err != nil {
		return nil, err
	}

	var bannerResource string

	if cat.BannerMedia() != nil {
		bannerResource = cat.BannerMedia().LegacyResource()
	}

	var thumbnailResource string

	if cat.ThumbnailMedia() != nil {
		thumbnailResource = cat.ThumbnailMedia().LegacyResource()
	}

	return &categoryDocument{
		Id:                cat.ID(),
		TopicId:           cat.TopicId(),
		Slug:              cat.Slug(),
		ThumbnailResource: thumbnailResource,
		BannerResource:    bannerResource,
		BannerMedia:       marshalledBanner,
		AlternativeTitles: localization.MarshalLocalizedDataTagsToDatabase(cat.AlternativeTitles()),
		Title:             localization.MarshalTranslationToDatabase(cat.Title()),
		CreatedAt:         cat.CreatedAt(),
		UpdatedAt:         cat.UpdatedAt(),
		TotalLikes:        cat.TotalLikes(),
		TotalPosts:        cat.TotalPosts(),
	}, nil
}

func (r PostsCassandraElasticsearchRepository) unmarshalCategoryDocument(ctx context.Context, source json.RawMessage, sort []interface{}) (*post.Category, error) {

	var pst categoryDocument

	err := json.Unmarshal(source, &pst)

	if err != nil {
		return nil, errors.Wrap(err, "failed to unmarshal category document")
	}

	unmarshalled, err := media.UnmarshalMediaWithLegacyResourceFromDatabase(ctx, pst.ThumbnailResource, nil)

	if err != nil {
		return nil, err
	}

	unmarshalledBanner, err := media.UnmarshalMediaWithLegacyResourceFromDatabase(ctx, pst.BannerResource, pst.BannerMedia)

	if err != nil {
		return nil, err
	}

	newCategory := post.UnmarshalCategoryFromDatabase(
		pst.Id,
		pst.Slug,
		pst.Title,
		unmarshalled,
		unmarshalledBanner,
		pst.TotalLikes,
		pst.TotalPosts,
		pst.CreatedAt,
		pst.UpdatedAt,
		pst.TopicId,
		pst.AlternativeTitles,
	)

	if sort != nil {
		newCategory.Node = paging.NewNode(sort)
	}

	return newCategory, nil
}

func (r PostsCassandraElasticsearchRepository) indexCategory(ctx context.Context, category *post.Category) error {

	cat, err := marshalCategoryToDocument(category)

	if err != nil {
		return err
	}

	_, err = r.client.
		Index().
		Index(categoryWriterIndex).
		Id(category.ID()).
		BodyJson(cat).
		Do(ctx)

	if err != nil {
		return errors.Wrap(support.ParseElasticError(err), "failed to index category")
	}

	return nil
}

func (r PostsCassandraElasticsearchRepository) ScanCategories(ctx context.Context, categoryId string, callback func(category *post.Category) error) error {

	builder := r.client.Search().
		Index(CategoryReaderIndex)

	query := elastic.NewBoolQuery()

	var filterQueries []elastic.Query

	if categoryId != "" {
		filterQueries = append(filterQueries, elastic.NewTermQuery("id", categoryId))
	}

	query.Filter(filterQueries...)

	builder.Query(query)
	builder.Size(10000)

	response, err := builder.Pretty(true).Do(ctx)

	if err != nil {
		return errors.Wrap(support.ParseElasticError(err), "failed to search categories")
	}

	for _, hit := range response.Hits.Hits {

		createdPost, err := r.unmarshalCategoryDocument(ctx, hit.Source, hit.Sort)

		if err != nil {
			return err
		}

		if err := callback(createdPost); err != nil {
			return err
		}
	}

	return nil
}

func (r PostsCassandraElasticsearchRepository) GetCategoriesByIds(ctx context.Context, categoryIds []string) ([]*post.Category, error) {

	var categories []*post.Category

	if len(categoryIds) == 0 {
		return categories, nil
	}

	builder := r.client.MultiGet().Realtime(false)

	for _, categoryId := range categoryIds {
		builder.Add(elastic.NewMultiGetItem().Id(categoryId).Index(CategoryReaderIndex))
	}

	response, err := builder.Do(ctx)

	if err != nil {
		return nil, errors.Wrap(support.ParseElasticError(err), "failed search categories")
	}

	for _, hit := range response.Docs {

		result, err := r.unmarshalCategoryDocument(ctx, hit.Source, nil)

		if err != nil {
			return nil, err
		}

		categories = append(categories, result)
	}

	return categories, nil
}

func (r PostsCassandraElasticsearchRepository) SearchCategories(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, filter *post.CategoryFilters) ([]*post.Category, error) {

	builder := r.client.Search().
		Index(CategoryReaderIndex).ErrorTrace(true)

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

	if filter.Title() != nil {
		query.Must(
			elastic.
				NewMultiMatchQuery(*filter.Title(), "title.en", "alternative_titles.en").
				Type("best_fields"),
		)
	}

	if filter.TopicId() != nil {
		query.Filter(elastic.NewTermQuery("topic_id", *filter.TopicId()))
	}

	if len(filter.Slugs()) > 0 {
		for _, id := range filter.Slugs() {
			query.Filter(elastic.NewTermQuery("slug", id))
		}
	}

	if filter.ExcludeEmpty() {
		query.Must(elastic.NewRangeQuery("total_posts").Gt(0))
	}

	builder.Query(query)

	response, err := builder.Do(ctx)

	if err != nil {
		return nil, errors.Wrap(support.ParseElasticError(err), "failed to search categories")
	}

	var cats []*post.Category

	for _, hit := range response.Hits.Hits {

		newCategory, err := r.unmarshalCategoryDocument(ctx, hit.Source, hit.Sort)

		if err != nil {
			return nil, err
		}

		cats = append(cats, newCategory)
	}

	return cats, nil
}

func (r PostsCassandraElasticsearchRepository) IndexAllCategories(ctx context.Context) error {

	scanner := database.NewScan(r.session,
		database.ScanConfig{
			NodesInCluster: 1,
			CoresInNode:    2,
			SmudgeFactor:   3,
		},
	)

	err := scanner.RunIterator(ctx, categoryTable, func(iter *gocqlx.Iterx) error {

		var c category

		for iter.StructScan(&c) {

			unmarshalled, err := r.unmarshalCategoryFromDatabase(ctx, &c)

			if err != nil {
				return err
			}

			marshalled, err := marshalCategoryToDocument(unmarshalled)

			if err != nil {
				return err
			}

			_, err = r.client.
				Index().
				Index(categoryWriterIndex).
				Id(marshalled.Id).
				OpType("create").
				BodyJson(marshalled).
				Do(ctx)

			if err != nil {
				e, ok := err.(*elastic.Error)
				if ok && e.Details.Type == "version_conflict_engine_exception" {
					zap.S().Infof("skipping document [%s] due to conflict", marshalled.Id)
				} else {
					return errors.Wrap(support.ParseElasticError(err), "failed to index categories")
				}
			}
		}

		return nil
	})

	if err != nil {
		return err
	}

	return nil
}
