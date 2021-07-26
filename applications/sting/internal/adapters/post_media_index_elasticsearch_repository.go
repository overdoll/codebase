package adapters

import (
	"context"
	"encoding/json"
	"errors"
	"strconv"

	"github.com/olivere/elastic/v7"
	"github.com/scylladb/gocqlx/v2"
	"github.com/segmentio/ksuid"
	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/paging"
	"overdoll/libraries/scan"
)

type mediaDocument struct {
	Id        string `json:"id"`
	Thumbnail string `json:"thumbnail"`
	Title     string `json:"title"`
	CreatedAt string `json:"created_at"`
}

const mediaIndex = `
{
	"mappings": {
		"dynamic": "strict",
		"properties": {
			"id": {
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

const mediaIndexName = "media"

func (r PostsIndexElasticSearchRepository) SearchMedias(ctx context.Context, cursor *paging.Cursor, search string) ([]*post.Media, error) {

	builder := r.client.Search().
		Index(mediaIndexName)

	if cursor == nil {
		return nil, errors.New("cursor required")
	}

	query := cursor.BuildElasticsearch(builder, "created_at")

	if search != "" {
		query.Must(elastic.NewMultiMatchQuery(search, "title").Operator("and"))
	}

	builder.Query(query)

	response, err := builder.Pretty(true).Do(ctx)

	if err != nil {
		return nil, err
	}

	var meds []*post.Media

	for _, hit := range response.Hits.Hits {

		var md mediaDocument

		err := json.Unmarshal(hit.Source, &md)

		if err != nil {
			return nil, err
		}

		newMedia := post.UnmarshalMediaFromDatabase(md.Id, md.Title, md.Thumbnail)
		newMedia.Node = paging.NewNode(md.CreatedAt)

		meds = append(meds, newMedia)
	}

	return meds, nil
}

func (r PostsIndexElasticSearchRepository) IndexAllMedia(ctx context.Context) error {

	scanner := scan.New(r.session,
		scan.Config{
			NodesInCluster: 1,
			CoresInNode:    2,
			SmudgeFactor:   3,
		},
	)

	err := scanner.RunIterator(mediaTable, func(iter *gocqlx.Iterx) error {

		var m media

		for iter.StructScan(&m) {

			parse, err := ksuid.Parse(m.Id)

			if err != nil {
				return err
			}

			doc := mediaDocument{
				Id:        m.Id,
				Thumbnail: m.Thumbnail,
				Title:     m.Title,
				CreatedAt: strconv.FormatInt(parse.Time().Unix(), 10),
			}

			_, err = r.client.
				Index().
				Index(mediaIndexName).
				Id(m.Id).
				BodyJson(doc).
				Do(ctx)

			if err != nil {
				return err
			}
		}

		return nil
	})

	if err != nil {
		return err
	}

	return nil
}

func (r PostsIndexElasticSearchRepository) DeleteMediaIndex(ctx context.Context) error {

	exists, err := r.client.IndexExists(mediaIndexName).Do(ctx)

	if err != nil {
		return err
	}

	if exists {
		if _, err := r.client.DeleteIndex(mediaIndexName).Do(ctx); err != nil {
			// Handle error
			return err
		}
	}

	if _, err := r.client.CreateIndex(mediaIndexName).BodyString(mediaIndex).Do(ctx); err != nil {
		return err
	}

	return nil
}
