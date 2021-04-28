package queries

import (
	"context"
	"encoding/json"

	"overdoll/applications/hades/src/app"
	"overdoll/applications/hades/src/ports/graphql/types"
)

type QueryResolver struct {
	App app.Application
}

func (r *QueryResolver) Characters(ctx context.Context, data types.SearchInput) ([]*types.Character, error) {

	results, err := r.App.Queries.SearchCharacters.Handle(ctx, data.Search)

	if err != nil {
		return nil, err
	}

	resp := make([]*types.Character, 0)

	// Unmarshal our json into the correct model
	for _, result := range results {

		var model *types.Character

		err = json.Unmarshal(result, &model)

		if err != nil {
			return resp, nil
		}

		resp = append(resp, model)
	}

	return resp, nil
}

func (r *QueryResolver) Categories(ctx context.Context, data types.SearchInput) ([]*types.Category, error) {

	results, err := r.App.Queries.SearchCategories.Handle(ctx, data.Search)

	if err != nil {
		return nil, err
	}

	resp := make([]*types.Category, 0)

	// Unmarshal our json into the correct model
	for _, result := range results {

		var model *types.Category

		err = json.Unmarshal(result, &model)

		if err != nil {
			return resp, nil
		}

		resp = append(resp, model)
	}

	return resp, nil
}

func (r *QueryResolver) Artists(ctx context.Context, data types.SearchInput) ([]*types.Artist, error) {

	results, err := r.App.Queries.SearchArtist.Handle(ctx, data.Search)

	if err != nil {
		return nil, err
	}

	resp := make([]*types.Artist, 0)

	// Unmarshal our json into the correct model
	for _, result := range results {

		var model *types.Artist

		err = json.Unmarshal(result, &model)

		if err != nil {
			return resp, nil
		}

		resp = append(resp, model)
	}

	return resp, nil
}

func (r *QueryResolver) Media(ctx context.Context, data types.SearchInput) ([]*types.Media, error) {

	results, err := r.App.Queries.SearchArtist.Handle(ctx, data.Search)

	if err != nil {
		return nil, err
	}

	resp := make([]*types.Media, 0)

	// Unmarshal our json into the correct model
	for _, result := range results {

		var model *types.Media

		err = json.Unmarshal(result, &model)

		if err != nil {
			return resp, nil
		}

		resp = append(resp, model)
	}

	return resp, nil
}

func (r *QueryResolver) RedeemCookie(ctx context.Context, cookie string) (*types.Cookie, error) {
	return r.App.Commands.RedeemCookie.Handle(ctx, cookie)
}

func (r *QueryResolver) Authentication(ctx context.Context) (*types.Authentication, error) {
	return r.App.Commands.Authentication.Handle(ctx)
}
