package adapters

import (
	"context"
	"encoding/json"
	"overdoll/libraries/errors"
	resource "overdoll/libraries/resource"
	"overdoll/libraries/support"
	"time"

	"github.com/olivere/elastic/v7"
	"github.com/scylladb/gocqlx/v2"
	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/localization"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
	"overdoll/libraries/scan"
)

type audienceDocument struct {
	Id                string            `json:"id"`
	Slug              string            `json:"slug"`
	Title             map[string]string `json:"title"`
	ThumbnailResource string            `json:"thumbnail_resource"`
	Standard          int               `json:"standard"`
	TotalLikes        int               `json:"total_likes"`
	TotalPosts        int               `json:"total_posts"`
	CreatedAt         time.Time         `json:"created_at"`
}

const AudienceIndexName = "audience"

func marshalAudienceToDocument(cat *post.Audience) (*audienceDocument, error) {

	stnd := 0

	if cat.IsStandard() {
		stnd = 1
	}

	var res string

	if cat.ThumbnailResource() != nil {
		marshalled, err := resource.MarshalResourceToDatabase(cat.ThumbnailResource())

		if err != nil {
			return nil, err
		}

		res = marshalled
	}

	return &audienceDocument{
		Id:                cat.ID(),
		Slug:              cat.Slug(),
		ThumbnailResource: res,
		Title:             localization.MarshalTranslationToDatabase(cat.Title()),
		CreatedAt:         cat.CreatedAt(),
		Standard:          stnd,
		TotalLikes:        cat.TotalLikes(),
		TotalPosts:        cat.TotalPosts(),
	}, nil
}

func (r PostsCassandraElasticsearchRepository) SearchAudience(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, filter *post.ObjectFilters) ([]*post.Audience, error) {

	builder := r.client.Search().
		Index(AudienceIndexName)

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

	response, err := builder.Pretty(true).Do(ctx)

	if err != nil {
		return nil, errors.Wrap(support.ParseElasticError(err), "failed search audiences")
	}

	var audiences []*post.Audience

	for _, hit := range response.Hits.Hits {

		var bd audienceDocument

		if err := json.Unmarshal(hit.Source, &bd); err != nil {
			return nil, errors.Wrap(err, "failed search audience - unmarshal")
		}

		unmarshalled, err := r.resourceSerializer.UnmarshalResourceFromDatabase(ctx, bd.ThumbnailResource)

		if err != nil {
			return nil, err
		}

		newAudience := post.UnmarshalAudienceFromDatabase(bd.Id, bd.Slug, bd.Title, unmarshalled, bd.Standard, bd.TotalLikes, bd.TotalPosts, bd.CreatedAt)
		newAudience.Node = paging.NewNode(hit.Sort)

		audiences = append(audiences, newAudience)
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
		Index(AudienceIndexName).
		Id(audience.ID()).
		BodyJson(marshalled).
		Do(ctx)

	if err != nil {
		return errors.Wrap(support.ParseElasticError(err), "failed to index audience")
	}

	return nil
}

func (r PostsCassandraElasticsearchRepository) IndexAllAudience(ctx context.Context) error {

	scanner := scan.New(r.session,
		scan.Config{
			NodesInCluster: 1,
			CoresInNode:    2,
			SmudgeFactor:   3,
		},
	)

	err := scanner.RunIterator(ctx, audienceTable, func(iter *gocqlx.Iterx) error {

		var m audience

		for iter.StructScan(&m) {

			doc := audienceDocument{
				Id:                m.Id,
				Slug:              m.Slug,
				ThumbnailResource: m.ThumbnailResource,
				Title:             m.Title,
				Standard:          m.Standard,
				CreatedAt:         m.CreatedAt,
				TotalLikes:        m.TotalLikes,
			}

			_, err := r.client.
				Index().
				Index(AudienceIndexName).
				Id(m.Id).
				BodyJson(doc).
				Do(ctx)

			if err != nil {
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
