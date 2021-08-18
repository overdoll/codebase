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

type seriesDocument struct {
	Id        string `json:"id"`
	Slug      string `json:"slug"`
	Thumbnail string `json:"thumbnail"`
	Title     string `json:"title"`
	CreatedAt string `json:"created_at"`
}

const seriesIndex = `
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

const seriesIndexName = "series"

func (r PostsIndexElasticSearchRepository) SearchSeries(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, filters *post.ObjectFilters) ([]*post.Series, error) {

	builder := r.client.Search().
		Index(seriesIndexName)

	if cursor == nil {
		return nil, errors.New("cursor required")
	}

	query := cursor.BuildElasticsearch(builder, "created_at")

	if filters.Search() != nil {
		query.Must(elastic.NewMultiMatchQuery(*filters.Search(), "title").Operator("and"))
	}

	builder.Query(query)

	response, err := builder.Pretty(true).Do(ctx)

	if err != nil {
		return nil, fmt.Errorf("failed search medias: %v", err)
	}

	var meds []*post.Series

	for _, hit := range response.Hits.Hits {

		var md seriesDocument

		err := json.Unmarshal(hit.Source, &md)

		if err != nil {
			return nil, fmt.Errorf("failed search medias - unmarshal: %v", err)
		}

		newMedia := post.UnmarshalSeriesFromDatabase(md.Id, md.Slug, md.Title, md.Thumbnail)
		newMedia.Node = paging.NewNode(md.CreatedAt)

		meds = append(meds, newMedia)
	}

	return meds, nil
}

func (r PostsIndexElasticSearchRepository) GetSeriesBySlug(ctx context.Context, requester *principal.Principal, slug string) (*post.Series, error) {
	panic("implement me")
}

func (r PostsIndexElasticSearchRepository) IndexAllSeries(ctx context.Context) error {

	scanner := scan.New(r.session,
		scan.Config{
			NodesInCluster: 1,
			CoresInNode:    2,
			SmudgeFactor:   3,
		},
	)

	err := scanner.RunIterator(ctx, seriesTable, func(iter *gocqlx.Iterx) error {

		var m series

		for iter.StructScan(&m) {

			parse, err := ksuid.Parse(m.Id)

			if err != nil {
				return err
			}

			doc := seriesDocument{
				Id:        m.Id,
				Slug:      m.Slug,
				Thumbnail: m.Thumbnail,
				Title:     m.Title,
				CreatedAt: strconv.FormatInt(parse.Time().Unix(), 10),
			}

			_, err = r.client.
				Index().
				Index(seriesIndexName).
				Id(m.Id).
				BodyJson(doc).
				Do(ctx)

			if err != nil {
				return fmt.Errorf("failed to index series: %v", err)
			}
		}

		return nil
	})

	if err != nil {
		return err
	}

	return nil
}

func (r PostsIndexElasticSearchRepository) DeleteSeriesIndex(ctx context.Context) error {

	exists, err := r.client.IndexExists(seriesIndexName).Do(ctx)

	if err != nil {
		return err
	}

	if exists {
		if _, err := r.client.DeleteIndex(seriesIndexName).Do(ctx); err != nil {
			// Handle error
			return err
		}
	}

	if _, err := r.client.CreateIndex(seriesIndexName).BodyString(seriesIndex).Do(ctx); err != nil {
		return err
	}

	return nil
}
