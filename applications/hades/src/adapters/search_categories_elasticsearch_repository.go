package adapters

import (
	"context"
	"encoding/json"
	"fmt"
)

const SearchCategories = `
	"query" : {
		"multi_match" : {
			"query" : %q,
			"fields" : ["title^100"],
			"operator" : "and"
		}
	},
	"size" : 5`

const AllCategories = `
	"query" : { "match_all" : {} },
	"size" : 5`

func (r ElasticsearchRepository) SearchCategories(ctx context.Context, search string) ([]json.RawMessage, error) {
	var query string

	if search == "" {
		query = AllCategories
	} else {
		query = fmt.Sprintf(SearchCategories, search)
	}

	response, err := r.store.Search("categories", query)

	if err != nil {
		return nil, err
	}

	return response.Hits, nil
}
