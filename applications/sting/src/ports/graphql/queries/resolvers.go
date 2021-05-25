package queries

import (
	"context"

	"overdoll/applications/sting/src/app"
	"overdoll/applications/sting/src/ports/graphql/types"
)

type QueryResolver struct {
	App *app.Application
}

func (r *QueryResolver) Characters(ctx context.Context, data types.SearchInput) ([]*types.Character, error) {

	results, err := r.App.Queries.SearchCharacters.Handle(ctx, data.Search)

	if err != nil {
		return nil, err
	}

	resp := make([]*types.Character, 0)

	// Unmarshal our json into the correct model
	for _, result := range results {

		resp = append(resp, &types.Character{
			ID:        result.ID(),
			Thumbnail: result.Thumbnail(),
			Name:      result.Name(),
			Media: &types.Media{
				ID:        result.Media().ID(),
				Thumbnail: result.Media().Thumbnail(),
				Title:     result.Media().Title(),
			},
		})
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

		resp = append(resp, &types.Category{
			ID:        result.ID(),
			Thumbnail: result.Thumbnail(),
			Title:     result.Title(),
		})
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

		resp = append(resp, &types.Artist{
			ID:       result.ID(),
			Avatar:   result.Avatar(),
			Username: result.Username(),
		})
	}

	return resp, nil
}

func (r *QueryResolver) Media(ctx context.Context, data types.SearchInput) ([]*types.Media, error) {

	results, err := r.App.Queries.SearchMedias.Handle(ctx, data.Search)

	if err != nil {
		return nil, err
	}

	resp := make([]*types.Media, 0)

	// Unmarshal our json into the correct model
	for _, result := range results {

		resp = append(resp, &types.Media{
			ID:        result.ID(),
			Thumbnail: result.Thumbnail(),
			Title:     result.Title(),
		})
	}

	return resp, nil
}
