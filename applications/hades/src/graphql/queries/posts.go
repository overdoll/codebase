package queries

import (
	"context"
	"fmt"

	"github.com/tidwall/gjson"
	"overdoll/applications/hades/src/models"
)

const SearchCharacters = `
	"query" : {
		 "match_all" : {}
	},
	"size" : 100`

func (r *QueryResolver) Characters(ctx context.Context, data *models.CharacterSearchInput) ([]*models.Character, error) {
	//query := fmt.Sprintf(SearchCharacters, data.Name)

	response, err := r.Search.Search("characters", models.Character{}, SearchCharacters)

	if err != nil {
		return nil, err
	}

	results := response.Hits

	resp := make([]*models.Character, 0)

	// Unmarshal our json into the correct model
	for _, result := range results {

		str, _ := result.MarshalJSON()

		m, ok := gjson.Parse(string(str)).Value().(*models.Character)

		if !ok {

		}

		resp = append(resp, m)
	}

	fmt.Print(resp)

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
