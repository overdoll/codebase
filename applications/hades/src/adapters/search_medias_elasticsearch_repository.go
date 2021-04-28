package adapters

import (
	"context"
	"encoding/json"
	"fmt"
)

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

func (r ElasticsearchRepository) SearchArtists(ctx context.Context, search string) ([]json.RawMessage, error) {
	var query string

	if search == "" {
		query = AllArtists
	} else {
		query = fmt.Sprintf(SearchArtists, search)
	}

	response, err := r.store.Search("artists", query)

	if err != nil {
		return nil, err
	}

	return response.Hits, nil
}
