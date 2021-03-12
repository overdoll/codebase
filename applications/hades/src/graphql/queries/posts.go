package queries

import (
	"context"
	"encoding/json"
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
	"size" : 5`

const AllCharacters = `
	"query" : { "match_all" : {} },
	"size" : 5`

func (r *QueryResolver) Characters(ctx context.Context, data *models.CharacterSearchInput) ([]*models.Character, error) {

	var query string

	if data.Name == "" {
		query = AllCharacters
	} else {
		query = fmt.Sprintf(SearchCharacters, data.Name)
	}

	response, err := r.Search.Search("characters", query)

	if err != nil {
		return nil, err
	}

	results := response.Hits

	resp := make([]*models.Character, 0)

	// Unmarshal our json into the correct model
	for _, result := range results {

		var model *models.Character

		err = json.Unmarshal(result, &model)

		if err != nil {
			return resp, nil
		}

		resp = append(resp, model)
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
	"size" : 5`

const AllCategories = `
	"query" : { "match_all" : {} },
	"size" : 5`

func (r *QueryResolver) Categories(ctx context.Context, data *models.CategorySearchInput) ([]*models.Category, error) {
	var query string

	if data.Title == "" {
		query = AllCategories
	} else {
		query = fmt.Sprintf(SearchCategories, data.Title)
	}

	response, err := r.Search.Search("categories", query)

	if err != nil {
		return nil, err
	}

	results := response.Hits

	resp := make([]*models.Category, 0)

	// Unmarshal our json into the correct model
	for _, result := range results {

		var model *models.Category

		err = json.Unmarshal(result, &model)

		if err != nil {
			return resp, nil
		}

		resp = append(resp, model)
	}

	return resp, nil
}

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

func (r *QueryResolver) Artists(ctx context.Context, data *models.Artist) ([]*models.Artist, error) {
	var query string

	if data.Username == "" {
		query = AllArtists
	} else {
		query = fmt.Sprintf(SearchArtists, data.Username)
	}

	response, err := r.Search.Search("artists", query)

	if err != nil {
		return nil, err
	}

	results := response.Hits

	resp := make([]*models.Artist, 0)

	// Unmarshal our json into the correct model
	for _, result := range results {

		var model *models.Artist

		err = json.Unmarshal(result, &model)

		if err != nil {
			return resp, nil
		}

		resp = append(resp, model)
	}

	return resp, nil
}

