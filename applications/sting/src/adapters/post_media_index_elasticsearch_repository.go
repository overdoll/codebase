package adapters

import (
	"context"
	"encoding/json"
	"fmt"

	"overdoll/applications/sting/src/domain/post"
	"overdoll/libraries/paging"
)

type MediaDocument struct {
	Id        string `json:"id"`
	Thumbnail string `json:"thumbnail"`
	Title     string `json:"title"`
}

const MediaIndex = `
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

const SearchMedia = `
	"query" : {
		"multi_match" : {
			"query" : %q,
			"fields" : ["title^100"],
			"operator" : "and"
		}
	},
	"size" : 5`

const AllMedia = `
	"query" : { "match_all" : {} },
	"size" : 5`

const MediaIndexName = "media"

func (r PostsIndexElasticSearchRepository) SearchMedias(ctx context.Context, cursor *paging.Cursor, search string) ([]*post.Media, *paging.Info, error) {
	var query string

	if search == "" {
		query = AllMedia
	} else {
		query = fmt.Sprintf(SearchMedia, search)
	}

	response, err := r.store.Search(MediaIndexName, query)

	if err != nil {
		return nil, nil, err
	}

	var meds []*post.Media

	for _, med := range response.Hits {

		var md MediaDocument

		err := json.Unmarshal(med, &md)

		if err != nil {
			return nil, nil, err
		}

		newMedia := post.UnmarshalMediaFromDatabase(md.Id, md.Title, md.Thumbnail)
		newMedia.Node = paging.NewNode(md.Id)

		meds = append(meds, newMedia)
	}

	return meds, nil, nil
}

func (r PostsIndexElasticSearchRepository) BulkIndexMedia(ctx context.Context, media []*post.Media) error {

	err := r.store.CreateBulkIndex(MediaIndexName)

	if err != nil {
		return fmt.Errorf("error creating bulk indexer: %s", err)
	}

	// Now we can safely start creating our documents
	for _, med := range media {

		data := &MediaDocument{
			Id:        med.ID(),
			Thumbnail: med.RawThumbnail(),
			Title:     med.Title(),
		}

		err = r.store.AddToBulkIndex(data.Id, data)

		if err != nil {
			return fmt.Errorf("unexpected error: %s", err)
		}
	}

	if err := r.store.CloseBulkIndex(); err != nil {
		return fmt.Errorf("unexpected error: %s", err)
	}

	return nil
}

func (r PostsIndexElasticSearchRepository) DeleteMediaIndex(ctx context.Context) error {
	err := r.store.DeleteIndex(MediaIndexName)

	if err != nil {

	}

	err = r.store.CreateIndex(MediaIndexName, MediaIndex)

	if err != nil {
		return fmt.Errorf("failed to create media index: %s", err)
	}

	return nil
}
