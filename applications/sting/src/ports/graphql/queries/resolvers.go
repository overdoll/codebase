package queries

import (
	"context"

	"overdoll/applications/sting/src/app"
	"overdoll/applications/sting/src/domain/post"
	"overdoll/applications/sting/src/ports/graphql/types"
	"overdoll/libraries/graphql/relay"
	"overdoll/libraries/passport"
)

type QueryResolver struct {
	App *app.Application
}

func marshalPendingPostsToGraphQL(results []*post.PendingPost) []*types.PendingPostEdge {
	resp := make([]*types.PendingPostEdge, 0)

	// Unmarshal our json into the correct model
	for _, result := range results {

		var mediaRequests []string

		for _, med := range result.MediaRequests() {
			mediaRequests = append(mediaRequests, med.Title)
		}

		var characterRequests []*types.CharacterRequestType

		for _, med := range result.CharacterRequests() {
			characterRequests = append(characterRequests, &types.CharacterRequestType{
				Name:  med.Name,
				Media: med.Media,
			})
		}

		artist := result.Artist()
		id := artist.ID()

		var categories []*types.Category

		for _, cat := range result.Categories() {
			categories = append(categories, &types.Category{
				ID:        cat.ID(),
				Thumbnail: cat.Thumbnail(),
				Title:     cat.Title(),
			})
		}

		var characters []*types.Character

		for _, char := range result.Characters() {
			characters = append(characters, &types.Character{
				ID:        char.ID(),
				Thumbnail: char.Thumbnail(),
				Name:      char.Name(),
				Media: &types.Media{
					ID:        char.Media().ID(),
					Thumbnail: char.Media().Thumbnail(),
					Title:     char.Media().Title(),
				},
			})
		}

		resp = append(resp, &types.PendingPostEdge{
			Cursor: result.ID(),
			Node: &types.PendingPost{
				ID:        result.ID(),
				Moderator: result.ModeratorId(),
				Contributor: &types.Contributor{
					ID:       result.Contributor().ID(),
					Username: result.Contributor().Username(),
					Avatar:   result.Contributor().Avatar(),
				},
				Content:           result.Content(),
				Categories:        categories,
				Characters:        characters,
				MediaRequests:     mediaRequests,
				CharacterRequests: characterRequests,
				ArtistID:          &id,
				ArtistUsername:    artist.Username(),
			},
		})
	}

	return resp
}

func (r *QueryResolver) PendingPosts(ctx context.Context, input relay.ConnectionInput, filter types.PendingPostFilters) (*types.PendingPostConnection, error) {

	pass := passport.FromContext(ctx)

	if !pass.IsAuthenticated() {
		return nil, passport.ErrNotAuthenticated
	}

	results, err := r.App.Queries.GetPendingPosts.Handle(ctx, input.ToCursor(), "1q7MJ3JkhcdcJJNqZezdfQt5pZ6")

	if err != nil {
		return nil, err
	}

	return &types.PendingPostConnection{
		Edges:    marshalPendingPostsToGraphQL(results),
		PageInfo: nil,
	}, nil
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
