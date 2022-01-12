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

type audienceDocument struct {
	Id                  string            `json:"id"`
	Slug                string            `json:"slug"`
	Title               map[string]string `json:"title"`
	ThumbnailResourceId string            `json:"thumbnail_resource_id"`
	Standard            int               `json:"standard"`
	TotalLikes          int               `json:"total_likes"`
	TotalPosts          int               `json:"total_posts"`
	CreatedAt           string            `json:"created_at"`
}

const audienceIndexProperties = `
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
	"standard": {
		"type": "integer"
	},
	"total_likes": {
		"type": "integer"
	},
	"total_posts": {
		"type": "integer"
	},
	"title": ` + localization.ESIndex + `
	"created_at": {
		"type": "date"
	}
}
`

const audienceIndex = `
{
	"mappings": {
		"dynamic": "strict",
		"properties": ` + audienceIndexProperties + `
	}
}`

const audienceIndexName = "audience"

func marshalAudienceToDocument(cat *post.Audience) (*audienceDocument, error) {

	parse, err := ksuid.Parse(cat.ID())

	if err != nil {
		return nil, err
	}

	stnd := 0

	if cat.IsStandard() {
		stnd = 1
	}

	return &audienceDocument{
		Id:                  cat.ID(),
		Slug:                cat.Slug(),
		ThumbnailResourceId: cat.ThumbnailResourceId(),
		Title:               localization.MarshalTranslationToDatabase(cat.Title()),
		CreatedAt:           strconv.FormatInt(parse.Time().Unix(), 10),
		Standard:            stnd,
		TotalLikes:          cat.TotalLikes(),
		TotalPosts:          cat.TotalPosts(),
	}, nil
}

func (r PostsIndexElasticSearchRepository) SearchAudience(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, filter *post.ObjectFilters) ([]*post.Audience, error) {

	builder := r.client.Search().
		Index(audienceIndexName)

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

	response, err := builder.Pretty(true).Do(ctx)

	if err != nil {
		return nil, fmt.Errorf("failed search audiences: %v", err)
	}

	var audiences []*post.Audience

	for _, hit := range response.Hits.Hits {

		var bd audienceDocument

		err := json.Unmarshal(hit.Source, &bd)

		if err != nil {
			return nil, fmt.Errorf("failed search medias - unmarshal: %v", err)
		}

		newAudience := post.UnmarshalAudienceFromDatabase(bd.Id, bd.Slug, bd.Title, bd.ThumbnailResourceId, bd.Standard, bd.TotalLikes, bd.TotalPosts)
		newAudience.Node = paging.NewNode(hit.Sort)

		audiences = append(audiences, newAudience)
	}

	return audiences, nil
}

func (r PostsIndexElasticSearchRepository) IndexAudience(ctx context.Context, audience *post.Audience) error {

	aud, err := marshalAudienceToDocument(audience)

	if err != nil {
		return err
	}

	_, err = r.client.
		Index().
		Index(audienceIndexName).
		Id(audience.ID()).
		BodyJson(aud).
		Do(ctx)

	if err != nil {
		return err
	}

	return nil
}

func (r PostsIndexElasticSearchRepository) IndexAllAudience(ctx context.Context) error {

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

			parse, err := ksuid.Parse(m.Id)

			if err != nil {
				return err
			}

			doc := audienceDocument{
				Id:                  m.Id,
				Slug:                m.Slug,
				ThumbnailResourceId: m.ThumbnailResourceId,
				Title:               m.Title,
				Standard:            m.Standard,
				CreatedAt:           strconv.FormatInt(parse.Time().Unix(), 10),
				TotalLikes:          m.TotalLikes,
			}

			_, err = r.client.
				Index().
				Index(audienceIndexName).
				Id(m.Id).
				BodyJson(doc).
				Do(ctx)

			if err != nil {
				return fmt.Errorf("failed to index audience: %v", err)
			}
		}

		return nil
	})

	if err != nil {
		return err
	}

	return nil
}

func (r PostsIndexElasticSearchRepository) DeleteAudienceIndex(ctx context.Context) error {

	exists, err := r.client.IndexExists(audienceIndexName).Do(ctx)

	if err != nil {
		return err
	}

	if exists {
		if _, err := r.client.DeleteIndex(audienceIndexName).Do(ctx); err != nil {
			// Handle error
			return err
		}
	}

	if _, err := r.client.CreateIndex(audienceIndexName).BodyString(audienceIndex).Do(ctx); err != nil {
		return err
	}

	return nil
}
