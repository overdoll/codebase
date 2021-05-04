package adapters

import (
	"context"
	"encoding/json"
	"fmt"
	"log"

	"overdoll/applications/sting/src/domain/post"
)

type ArtistDocument struct {
	Id       string `json:"id"`
	Avatar   string `json:"avatar"`
	Username string `json:"username"`
}

const ArtistIndex = `
{
	"mappings": {
		"dynamic": "strict",
		"properties": {
			"id": {
				"type": "keyword"
			},
			"avatar": {
				"type": "keyword"
			},
			"username": {
				"type": "text",
				"analyzer": "english"
			}
		}
	}
}`

const SearchArtists = `
	"query" : {
		"multi_match" : {
			"query" : %q,
			"fields" : ["username^100"],
			"operator" : "and"
		}
	},
	"size" : 5`

const AllArtists = `
	"query" : { "match_all" : {} },
	"size" : 5`

const ArtistIndexName = "artists"

func (r PostIndexElasticSearchRepository) SearchArtists(ctx context.Context, search string) ([]*post.Artist, error) {
	var query string

	if search == "" {
		query = AllArtists
	} else {
		query = fmt.Sprintf(SearchArtists, search)
	}

	response, err := r.store.Search(ArtistIndexName, query)

	if err != nil {
		return nil, err
	}

	var artists []*post.Artist

	for _, cat := range response.Hits {

		var art *post.Artist

		err := json.Unmarshal(cat, art)

		if err != nil {
			continue
		}

		artists = append(artists, art)
	}

	return artists, nil
}

func (r PostIndexElasticSearchRepository) BulkIndexArtists(ctx context.Context, artists []*post.Artist) error {
	err := r.store.CreateBulkIndex(ArtistIndexName)

	if err != nil {
		log.Fatalf("error creating bulk indexer: %s", err)
	}

	// Now we can safely start creating our documents
	for _, art := range artists {

		data := &ArtistDocument{
			Id:       art.ID(),
			Avatar:   art.RawAvatar(),
			Username: art.Username(),
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

func (r PostIndexElasticSearchRepository) DeleteArtistIndex(ctx context.Context) error {
	err := r.store.DeleteIndex(ArtistIndexName)

	if err != nil {

	}

	err = r.store.CreateIndex(ArtistIndexName, ArtistIndex)

	if err != nil {
		return fmt.Errorf("failed to create artists index: %s", err)
	}

	return nil
}
