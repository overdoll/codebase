package queries

import (
	"context"
	"fmt"

	"overdoll/applications/hades/src/models"
)

const SearchCharacters = `
	"query" : {
		"multi_match" : {
			"query" : %q,
			"fields" : ["name^100"],
			"operator" : "and"
		}
	},
	"size" : 5,
	"sort" : [ { "characters" : "asc" } ]`


func (r *QueryResolver) Characters(ctx context.Context, data *models.CharacterSearchInput) ([]*models.Character, error) {

	query := fmt.Sprintf(SearchCharacters, *data.Name)

	response, err := r.Search.Search("characters", models.Character{}, query)

	if err != nil {
		return nil, err
	}

	results := response.Hits

	var resp []*models.Character

	// Cast our results into the correct type
	for _, result := range results {
		resp = append(resp, result.(*models.Character))
	}

	return resp, nil
}

const SearchCategories = `
	"query" : {
		"multi_match" : {
			"query" : %q,
			"fields" : ["title^100"],
			"operator" : "and"
		}
	},
	"size" : 5,
	"sort" : [ { "categories" : "asc" } ]`

func (r *QueryResolver) Categories(ctx context.Context, data *models.CategorySearchInput) ([]*models.Category, error) {
	panic("implement me")
}
