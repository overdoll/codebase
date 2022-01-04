package adapters

import (
	"context"
	"encoding/json"
	"errors"
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
	}, nil
}

func (r PostsIndexElasticSearchRepository) SearchAudience(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, filter *post.ObjectFilters) ([]*post.Audience, error) {

	builder := r.client.Search().
		Index(audienceIndexName)

	if cursor == nil {
		return nil, errors.New("cursor required")
	}

	query := cursor.BuildElasticsearch(builder, "created_at")

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

		newAudience := post.UnmarshalAudienceFromDatabase(bd.Id, bd.Slug, bd.Title, bd.ThumbnailResourceId, bd.Standard)
		newAudience.Node = paging.NewNode(bd.CreatedAt)

		audiences = append(audiences, newAudience)
	}

	return audiences, nil
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
