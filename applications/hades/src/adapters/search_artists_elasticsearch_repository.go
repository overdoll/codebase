package adapters

import (
	"context"
	"encoding/json"
	"fmt"
)

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

func (r ElasticsearchRepository) SearchMedias(ctx context.Context, search string) ([]json.RawMessage, error) {
	var query string

	if search == "" {
		query = AllMedia
	} else {
		query = fmt.Sprintf(SearchMedia, search)
	}

	response, err := r.store.Search("media", query)

	if err != nil {
		return nil, err
	}

	return response.Hits, nil
}
