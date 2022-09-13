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

type audienceDocument struct {
	Id                string            `json:"id"`
	Slug              string            `json:"slug"`
	Title             map[string]string `json:"title"`
	ThumbnailResource string            `json:"thumbnail_resource"`
	BannerResource    string            `json:"banner_resource"`
	ThumbnailMedia    []byte            `json:"thumbnail_media"`
	BannerMedia       []byte            `json:"banner_media"`
	Standard          int               `json:"standard"`
	TotalLikes        int               `json:"total_likes"`
	TotalPosts        int               `json:"total_posts"`
	CreatedAt         time.Time         `json:"created_at"`
	UpdatedAt         time.Time         `json:"updated_at"`
}

const AudienceIndexName = "audience"

var AudienceReaderIndex = cache.ReadAlias(CachePrefix, AudienceIndexName)
var audienceWriterIndex = cache.WriteAlias(CachePrefix, AudienceIndexName)

func marshalAudienceToDocument(cat *post.Audience) (*audienceDocument, error) {

	stnd := 0

	if cat.IsStandard() {
		stnd = 1
	}

	marshalledThumbnail, err := media.MarshalMediaToDatabase(cat.ThumbnailMedia())

	if err != nil {
		return nil, err
	}

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

	return &audienceDocument{
		Id:                cat.ID(),
		Slug:              cat.Slug(),
		ThumbnailMedia:    marshalledThumbnail,
		BannerMedia:       marshalledBanner,
		ThumbnailResource: thumbnailResource,
		BannerResource:    bannerResource,
		Title:             localization.MarshalTranslationToDatabase(cat.Title()),
		CreatedAt:         cat.CreatedAt(),
		Standard:          stnd,
		TotalLikes:        cat.TotalLikes(),
		TotalPosts:        cat.TotalPosts(),
		UpdatedAt:         cat.UpdatedAt(),
	}, nil
}

func (r PostsCassandraElasticsearchRepository) GetAudiencesByIds(ctx context.Context, audienceIds []string) ([]*post.Audience, error) {

	var audiences []*post.Audience

	// if none then we get out or else the query will fail
	if len(audienceIds) == 0 {
		return audiences, nil
	}

	builder := r.client.MultiGet().Realtime(false)

	for _, categoryId := range audienceIds {
		builder.Add(elastic.NewMultiGetItem().Id(categoryId).Index(AudienceReaderIndex))
	}

	response, err := builder.Do(ctx)

	if err != nil {
		return nil, errors.Wrap(support.ParseElasticError(err), "failed search audiences")
	}

	for _, hit := range response.Docs {

		result, err := r.unmarshalAudienceDocument(ctx, hit.Source, nil)

		if err != nil {
			return nil, err
		}

		audiences = append(audiences, result)
	}

	return audiences, nil
}

func (r PostsCassandraElasticsearchRepository) unmarshalAudienceDocument(ctx context.Context, source json.RawMessage, sort []interface{}) (*post.Audience, error) {

	var bd audienceDocument

	if err := json.Unmarshal(source, &bd); err != nil {
		return nil, errors.Wrap(err, "failed search audience - unmarshal")
	}

	unmarshalled, err := media.UnmarshalMediaWithLegacyResourceFromDatabase(ctx, bd.ThumbnailResource, bd.ThumbnailMedia)

	if err != nil {
		return nil, err
	}

	unmarshalledBanner, err := media.UnmarshalMediaWithLegacyResourceFromDatabase(ctx, bd.BannerResource, bd.BannerMedia)

	if err != nil {
		return nil, err
	}

	newAudience := post.UnmarshalAudienceFromDatabase(bd.Id, bd.Slug, bd.Title, unmarshalled, unmarshalledBanner, bd.Standard, bd.TotalLikes, bd.TotalPosts, bd.CreatedAt, bd.UpdatedAt)

	if sort != nil {
		newAudience.Node = paging.NewNode(sort)
	}

	return newAudience, nil
}

func (r PostsCassandraElasticsearchRepository) SearchAudience(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, filter *post.ObjectFilters) ([]*post.Audience, error) {

	builder := r.client.Search().
		Index(AudienceReaderIndex)

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

	builder.Query(query)

	response, err := builder.Pretty(true).Do(ctx)

	if err != nil {
		return nil, errors.Wrap(support.ParseElasticError(err), "failed search audiences")
	}

	var audiences []*post.Audience

	for _, hit := range response.Hits.Hits {

		result, err := r.unmarshalAudienceDocument(ctx, hit.Source, hit.Sort)

		if err != nil {
			return nil, err
		}

		audiences = append(audiences, result)
	}

	return audiences, nil
}

func (r PostsCassandraElasticsearchRepository) indexAudience(ctx context.Context, audience *post.Audience) error {

	marshalled, err := marshalAudienceToDocument(audience)

	if err != nil {
		return err
	}

	_, err = r.client.
		Index().
		Index(audienceWriterIndex).
		Id(audience.ID()).
		BodyJson(marshalled).
		Do(ctx)

	if err != nil {
		return errors.Wrap(support.ParseElasticError(err), "failed to index audience")
	}

	return nil
}

func (r PostsCassandraElasticsearchRepository) IndexAllAudience(ctx context.Context) error {

	scanner := database.NewScan(r.session,
		database.ScanConfig{
			NodesInCluster: 1,
			CoresInNode:    2,
			SmudgeFactor:   3,
		},
	)

	err := scanner.RunIterator(ctx, audienceTable, func(iter *gocqlx.Iterx) error {

		var m audience

		for iter.StructScan(&m) {

			unmarshalled, err := r.unmarshalAudienceFromDatabase(ctx, &m)

			if err != nil {
				return err
			}

			marshalled, err := marshalAudienceToDocument(unmarshalled)

			if err != nil {
				return err
			}

			_, err = r.client.
				Index().
				Index(audienceWriterIndex).
				Id(marshalled.Id).
				OpType("create").
				BodyJson(marshalled).
				Do(ctx)

			e, ok := err.(*elastic.Error)
			if ok && e.Details.Type == "version_conflict_engine_exception" {
				zap.S().Infof("skipping document [%s] due to conflict", marshalled.Id)
			} else {
				return errors.Wrap(support.ParseElasticError(err), "failed to index audience")
			}
		}

		return nil
	})

	if err != nil {
		return err
	}

	return nil
}
