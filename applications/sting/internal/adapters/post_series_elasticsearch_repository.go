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

type seriesDocument struct {
	Id                string            `json:"id"`
	Slug              string            `json:"slug"`
	ThumbnailResource string            `json:"thumbnail_resource"`
	BannerResource    string            `json:"banner_resource"`
	ThumbnailMedia    *string           `json:"thumbnail_media"`
	BannerMedia       *string           `json:"banner_media"`
	Title             map[string]string `json:"title"`
	CreatedAt         time.Time         `json:"created_at"`
	UpdatedAt         time.Time         `json:"updated_at"`
	TotalLikes        int               `json:"total_likes"`
	TotalPosts        int               `json:"total_posts"`
}

const SeriesIndexName = "series"

var SeriesReaderIndex = cache.ReadAlias(CachePrefix, SeriesIndexName)
var seriesWriterIndex = cache.WriteAlias(CachePrefix, SeriesIndexName)

func marshalSeriesToDocument(s *post.Series) (*seriesDocument, error) {

	if s == nil {
		return nil, nil
	}

	marshalledThumbnail, err := media.MarshalMediaToDatabase(s.ThumbnailMedia())

	if err != nil {
		return nil, err
	}

	marshalledBanner, err := media.MarshalMediaToDatabase(s.BannerMedia())

	if err != nil {
		return nil, err
	}

	return &seriesDocument{
		Id:                s.ID(),
		Slug:              s.Slug(),
		ThumbnailMedia:    marshalledThumbnail,
		BannerMedia:       marshalledBanner,
		BannerResource:    s.BannerMedia().LegacyResource(),
		ThumbnailResource: s.ThumbnailMedia().LegacyResource(),
		Title:             localization.MarshalTranslationToDatabase(s.Title()),
		CreatedAt:         s.CreatedAt(),
		TotalLikes:        s.TotalLikes(),
		TotalPosts:        s.TotalPosts(),
		UpdatedAt:         s.UpdatedAt(),
	}, nil
}

func (r PostsCassandraElasticsearchRepository) unmarshalSeriesDocument(ctx context.Context, source json.RawMessage, sort []interface{}) (*post.Series, error) {

	var md seriesDocument

	err := json.Unmarshal(source, &md)

	if err != nil {
		return nil, errors.Wrap(err, "failed search series - unmarshal")
	}

	unmarshalledThumbnail, err := media.UnmarshalMediaWithLegacyFromDatabase(ctx, md.ThumbnailResource, md.ThumbnailMedia)

	if err != nil {
		return nil, err
	}

	unmarshalledBanner, err := media.UnmarshalMediaWithLegacyFromDatabase(ctx, md.BannerResource, md.BannerMedia)

	if err != nil {
		return nil, err
	}

	newMedia := post.UnmarshalSeriesFromDatabase(
		md.Id,
		md.Slug,
		md.Title,
		unmarshalledThumbnail,
		unmarshalledBanner,
		md.TotalLikes,
		md.TotalPosts,
		md.CreatedAt,
		md.UpdatedAt,
	)

	if sort != nil {
		newMedia.Node = paging.NewNode(sort)
	}

	return newMedia, nil
}

func (r PostsCassandraElasticsearchRepository) GetSeriesByIds(ctx context.Context, seriesIds []string) ([]*post.Series, error) {

	var series []*post.Series

	if len(seriesIds) == 0 {
		return series, nil
	}

	builder := r.client.MultiGet().Realtime(false)

	for _, seriesId := range seriesIds {
		builder.Add(elastic.NewMultiGetItem().Id(seriesId).Index(SeriesReaderIndex))
	}

	response, err := builder.Do(ctx)

	if err != nil {
		return nil, errors.Wrap(support.ParseElasticError(err), "failed search series")
	}

	for _, hit := range response.Docs {

		result, err := r.unmarshalSeriesDocument(ctx, hit.Source, nil)

		if err != nil {
			return nil, err
		}

		series = append(series, result)
	}

	return series, nil
}

func (r PostsCassandraElasticsearchRepository) SearchSeries(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, filter *post.SeriesFilters) ([]*post.Series, error) {

	builder := r.client.Search().
		Index(SeriesReaderIndex)

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
				NewMultiMatchQuery(*filter.Search(), "title.en").
				Type("best_fields"),
		)
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

	response, err := builder.Pretty(true).Do(ctx)

	if err != nil {
		return nil, errors.Wrap(support.ParseElasticError(err), "failed search series")
	}

	var meds []*post.Series

	for _, hit := range response.Hits.Hits {

		newMedia, err := r.unmarshalSeriesDocument(ctx, hit.Source, hit.Sort)

		if err != nil {
			return nil, err
		}

		meds = append(meds, newMedia)
	}

	return meds, nil
}

func (r PostsCassandraElasticsearchRepository) indexSeries(ctx context.Context, series *post.Series) error {

	ss, err := marshalSeriesToDocument(series)

	if err != nil {
		return err
	}

	_, err = r.client.
		Index().
		Index(seriesWriterIndex).
		Id(series.ID()).
		BodyJson(ss).
		Do(ctx)

	if err != nil {
		return errors.Wrap(support.ParseElasticError(err), "failed to index series")
	}

	_, err = r.client.UpdateByQuery(characterWriterIndex).
		Query(elastic.NewNestedQuery("series", elastic.NewTermsQuery("series.id", series.ID()))).
		Script(elastic.NewScript("ctx._source.series= params.updatedSeries").Param("updatedSeries", ss).Lang("painless")).
		Do(ctx)

	if err != nil {
		return errors.Wrap(support.ParseElasticError(err), "failed to update index characters")
	}

	return nil
}

func (r PostsCassandraElasticsearchRepository) IndexAllSeries(ctx context.Context) error {

	scanner := database.NewScan(r.session,
		database.ScanConfig{
			NodesInCluster: 1,
			CoresInNode:    2,
			SmudgeFactor:   3,
		},
	)

	err := scanner.RunIterator(ctx, seriesTable, func(iter *gocqlx.Iterx) error {

		var m series

		for iter.StructScan(&m) {

			unmarshalled, err := r.unmarshalSeriesFromDatabase(ctx, &m)

			if err != nil {
				return err
			}

			doc, err := marshalSeriesToDocument(unmarshalled)

			if err != nil {
				return err
			}

			_, err = r.client.
				Index().
				Index(seriesWriterIndex).
				OpType("create").
				Id(doc.Id).
				BodyJson(doc).
				Do(ctx)

			if err != nil {
				e, ok := err.(*elastic.Error)
				if ok && e.Details.Type == "version_conflict_engine_exception" {
					zap.S().Infof("skipping document [%s] due to conflict", doc.Id)
				} else {
					return errors.Wrap(support.ParseElasticError(err), "failed to index series")
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
