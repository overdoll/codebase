package adapters

import (
	"context"
	"encoding/json"
	"fmt"
)

const SearchCharacters = `
	"query" : {
		"multi_match" : {
			"query" : %q,
			"fields" : ["name^100"],
			"operator" : "and"
		}
	},
	"size" : 5`

const AllCharacters = `
	"query" : { "match_all" : {} },
	"size" : 5`

func (r ElasticsearchRepository) SearchCharacters(ctx context.Context, search string) ([]json.RawMessage, error) {
	var query string

	if search == "" {
		query = AllCharacters
	} else {
		query = fmt.Sprintf(SearchCharacters, search)
	}

	response, err := r.store.Search("characters", query)

	if err != nil {
		return nil, err
	}

	return response.Hits, nil
}
