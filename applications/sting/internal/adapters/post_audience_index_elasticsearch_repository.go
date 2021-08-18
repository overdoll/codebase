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
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
	"overdoll/libraries/scan"
)

type audienceDocument struct {
	Id        string `json:"id"`
	Slug      string `json:"slug"`
	Title     string `json:"title"`
	Thumbnail string `json:"thumbnail"`
	Standard  int    `json:"standard"`
	CreatedAt string `json:"created_at"`
}

const audienceIndex = `
{
	"mappings": {
		"dynamic": "strict",
		"properties": {
			"id": {
				"type": "keyword"
			},
			"slug": {
				"type": "keyword"
			},
			"thumbnail": {
				"type": "keyword"
			},
			"standard": {
				"type": "integer"
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

	var thumbnail string

	if cat.Thumbnail() != nil {

		thumbnail, err = cat.Thumbnail().MarshalResourceToDatabase()

		if err != nil {
			return nil, err
		}
	}

	return &audienceDocument{
		Id:        cat.ID(),
		Slug:      cat.Slug(),
		Thumbnail: thumbnail,
		Title:     cat.Title(),
		CreatedAt: strconv.FormatInt(parse.Time().Unix(), 10),
		Standard:  stnd,
	}, nil
}

func (r PostsIndexElasticSearchRepository) SearchAudience(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, filters *post.ObjectFilters) ([]*post.Audience, error) {

	builder := r.client.Search().
		Index(audienceIndexName)

	if cursor == nil {
		return nil, errors.New("cursor required")
	}

	query := cursor.BuildElasticsearch(builder, "created_at")

	if filters.Search() != nil {
		query.Must(elastic.NewMultiMatchQuery(*filters.Search(), "name").Operator("and"))
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

		newAudience := post.UnmarshalAudienceFromDatabase(bd.Id, bd.Slug, bd.Title, bd.Thumbnail, bd.Standard)
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
				Id:        m.Id,
				Slug:      m.Slug,
				Thumbnail: m.Thumbnail,
				Title:     m.Title,
				Standard:  m.Standard,
				CreatedAt: strconv.FormatInt(parse.Time().Unix(), 10),
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

func (r PostsIndexElasticSearchRepository) GetAudienceBySlug(ctx context.Context, requester *principal.Principal, slug string) (*post.Audience, error) {
	panic("implement me")
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
