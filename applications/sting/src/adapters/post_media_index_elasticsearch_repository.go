package adapters

import (
	"context"
	"encoding/json"
	"fmt"

	"github.com/scylladb/gocqlx/v2"
	"overdoll/applications/sting/src/domain/post"
	"overdoll/libraries/paging"
	"overdoll/libraries/scan"
)

type mediaDocument struct {
	Id        string `json:"id"`
	Thumbnail string `json:"thumbnail"`
	Title     string `json:"title"`
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
			}
		}
	}
}`

const searchMedia = `
	"query" : {
		"multi_match" : {
			"query" : %q,
			"fields" : ["title^100"],
			"operator" : "and"
		}
	},
	"size" : 5`

const allMedia = `
	"query" : { "match_all" : {} },
	"size" : 5`

const mediaIndexName = "media"

func (r PostsIndexElasticSearchRepository) SearchMedias(ctx context.Context, cursor *paging.Cursor, search string) ([]*post.Media, error) {
	var query string

	if search == "" {
		query = allMedia
	} else {
		query = fmt.Sprintf(searchMedia, search)
	}

	response, err := r.store.Search(mediaIndexName, query)

	if err != nil {
		return nil, err
	}

	var meds []*post.Media

	for _, med := range response.Hits {

		var md mediaDocument

		err := json.Unmarshal(med, &md)

		if err != nil {
			return nil, err
		}

		newMedia := post.UnmarshalMediaFromDatabase(md.Id, md.Title, md.Thumbnail)
		newMedia.Node = paging.NewNode(md.Id)

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

		if err := r.store.CreateBulkIndex(mediaIndex); err != nil {
			return err
		}

		var m media

		for iter.StructScan(&m) {
			if err := r.store.AddToBulkIndex(m.Id, mediaDocument{
				Id:        m.Id,
				Thumbnail: m.Thumbnail,
				Title:     m.Title,
			}); err != nil {
				return err
			}
		}

		if err := r.store.CloseBulkIndex(); err != nil {
			return fmt.Errorf("unexpected error: %s", err)
		}

		return nil
	})

	if err != nil {
		return err
	}

	return nil
}

func (r PostsIndexElasticSearchRepository) DeleteMediaIndex(ctx context.Context) error {

	err := r.store.DeleteIndex(mediaIndexName)

	if err != nil {

	}

	err = r.store.CreateIndex(mediaIndexName, mediaIndex)

	if err != nil {
		return fmt.Errorf("failed to create media index: %s", err)
	}

	return nil
}
