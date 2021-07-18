package adapters

import (
	"context"
	"encoding/json"
	"fmt"
	"log"

	"overdoll/applications/sting/src/domain/post"
	"overdoll/libraries/paging"
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

func (r PostsIndexElasticSearchRepository) SearchArtists(ctx context.Context, cursor *paging.Cursor, search string) ([]*post.Artist, *paging.Info, error) {
	var query string

	if search == "" {
		query = AllArtists
	} else {
		query = fmt.Sprintf(SearchArtists, search)
	}

	response, err := r.store.Search(ArtistIndexName, query)

	if err != nil {
		return nil, nil, err
	}

	var artists []*post.Artist

	for _, cat := range response.Hits {

		var art ArtistDocument

		err := json.Unmarshal(cat, &art)

		if err != nil {
			return nil, nil, err
		}

		newArtist := post.UnmarshalArtistFromDatabase(art.Id, art.Username, art.Avatar)
		newArtist.Node = paging.NewNode(art.Id)

		artists = append(artists, newArtist)

	}

	return artists, nil, nil
}

func (r PostsIndexElasticSearchRepository) BulkIndexArtists(ctx context.Context, artists []*post.Artist) error {
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

func (r PostsIndexElasticSearchRepository) DeleteArtistIndex(ctx context.Context) error {
	err := r.store.DeleteIndex(ArtistIndexName)

	if err != nil {

	}

	err = r.store.CreateIndex(ArtistIndexName, ArtistIndex)

	if err != nil {
		return fmt.Errorf("failed to create artists index: %s", err)
	}

	return nil
}
