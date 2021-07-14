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

func (r *QueryResolver) PendingPost(ctx context.Context, id string) (*types.PendingPost, error) {
	pass := passport.FromContext(ctx)

	if !pass.IsAuthenticated() {
		return nil, passport.ErrNotAuthenticated
	}

	result, err := r.App.Queries.GetPendingPostAuthenticated.Handle(ctx, id, pass.AccountID())

	if err != nil {
		return nil, err
	}

	return types.MarshalPendingPostToGraphQL(&post.PendingPostEdge{
		Cursor: "",
		Node:   result,
	}).Node, nil
}

func (r *QueryResolver) PendingPosts(ctx context.Context, after *string, before *string, first *int, last *int, filter types.PendingPostFilters) (*types.PendingPostConnection, error) {

	pass := passport.FromContext(ctx)

	if !pass.IsAuthenticated() {
		return nil, passport.ErrNotAuthenticated
	}

	moderatorId := ""

	if filter.ModeratorID != nil {
		moderatorId = *filter.ModeratorID
	}

	contributorId := ""

	if filter.ContributorID != nil {
		contributorId = *filter.ContributorID
	}

	artistId := ""

	if filter.ArtistID != nil {
		artistId = *filter.ArtistID
	}

	id := ""

	if filter.ID != nil {
		id = *filter.ID
	}

	var startCursor *string
	var endCursor *string

	input := &relay.ConnectionInput{
		After:  after,
		Before: before,
		First:  first,
		Last:   last,
	}

	results, err := r.App.Queries.GetPendingPosts.Handle(ctx, input.ToCursor(), moderatorId, contributorId, artistId, id, pass.AccountID())

	if err != nil {
		return nil, err
	}

	var posts []*types.PendingPostEdge

	for _, result := range results.Edges {
		posts = append(posts, types.MarshalPendingPostToGraphQL(result))
	}

	if len(posts) > 0 {
		startCursor = &posts[0].Cursor
		endCursor = &posts[len(posts)-1].Cursor
	}

	return &types.PendingPostConnection{
		Edges: posts,
		PageInfo: &relay.PageInfo{
			HasNextPage:     results.PageInfo.HasNextPage(),
			HasPreviousPage: results.PageInfo.HasPrevPage(),
			StartCursor:     startCursor,
			EndCursor:       endCursor,
		},
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
