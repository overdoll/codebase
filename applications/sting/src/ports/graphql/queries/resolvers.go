package queries

import (
	"context"

	"overdoll/applications/sting/src/app"
	"overdoll/applications/sting/src/ports/graphql/types"
	"overdoll/libraries/graphql/relay"
)

type QueryResolver struct {
	App *app.Application
}

func (r *QueryResolver) Artists(ctx context.Context, after *string, before *string, first *int, last *int, username *string) (*types.ArtistConnection, error) {

	cursor, err := relay.NewCursor(after, before, first, last)

	if err != nil {
		return nil, err
	}

	search := ""

	if username != nil {
		search = *username
	}

	results, paging, err := r.App.Queries.SearchArtist.Handle(ctx, cursor, search)

	if err != nil {
		return nil, err
	}

	resp := make([]*types.ArtistEdge, 0)

	// Unmarshal our json into the correct model
	for _, result := range results {
		resp = append(resp, &types.ArtistEdge{
			Cursor: result.ID(),
			Node:   types.MarshalArtistToGraphQL(result),
		})
	}

	var startCursor *string
	var endCursor *string

	if len(results) > 0 {
		startCursor = results[0].ID()
	}

	return &types.ArtistConnection{
		Edges: resp,
		PageInfo: &relay.PageInfo{
			HasNextPage:     paging.HasNextPage(),
			HasPreviousPage: paging.HasPrevPage(),
			StartCursor:     nil,
			EndCursor:       nil,
		},
	}, nil
}

func (r *QueryResolver) Categories(ctx context.Context, after *string, before *string, first *int, last *int, name *string) (*types.CategoryConnection, error) {

	cursor, err := relay.NewCursor(after, before, first, last)

	if err != nil {
		return nil, err
	}

	search := ""

	if name != nil {
		search = *name
	}

	results, paging, err := r.App.Queries.SearchCategories.Handle(ctx, cursor, search)

	if err != nil {
		return nil, err
	}

	resp := make([]*types.CategoryEdge, 0)

	// Unmarshal our json into the correct model
	for _, result := range results {
		resp = append(resp, &types.CategoryEdge{
			Cursor: result.ID(),
			Node:   types.MarshalCategoryToGraphQL(result),
		})
	}

	return &types.CategoryConnection{
		Edges: resp,
		PageInfo: &relay.PageInfo{
			HasNextPage:     paging.HasNextPage(),
			HasPreviousPage: paging.HasPrevPage(),
			StartCursor:     nil,
			EndCursor:       nil,
		},
	}, nil
}

func (r *QueryResolver) Medias(ctx context.Context, after *string, before *string, first *int, last *int, title *string) (*types.MediaConnection, error) {

	cursor, err := relay.NewCursor(after, before, first, last)

	if err != nil {
		return nil, err
	}

	search := ""

	if title != nil {
		search = *title
	}

	results, paging, err := r.App.Queries.SearchMedias.Handle(ctx, cursor, search)

	if err != nil {
		return nil, err
	}

	resp := make([]*types.MediaEdge, 0)

	// Unmarshal our json into the correct model
	for _, result := range results {
		resp = append(resp, &types.MediaEdge{
			Cursor: result.ID(),
			Node:   types.MarshalMediaToGraphQL(result),
		})
	}

	return &types.MediaConnection{
		Edges: resp,
		PageInfo: &relay.PageInfo{
			HasNextPage:     paging.HasNextPage(),
			HasPreviousPage: paging.HasPrevPage(),
			StartCursor:     nil,
			EndCursor:       nil,
		},
	}, nil
}

func (r *QueryResolver) Characters(ctx context.Context, after *string, before *string, first *int, last *int, name *string, mediaTitle *string) (*types.CharacterConnection, error) {

	cursor, err := relay.NewCursor(after, before, first, last)

	if err != nil {
		return nil, err
	}

	search := ""

	if name != nil {
		search = *name
	}

	results, paging, err := r.App.Queries.SearchCharacters.Handle(ctx, cursor, search)

	if err != nil {
		return nil, err
	}

	resp := make([]*types.CharacterEdge, 0)

	// Unmarshal our json into the correct model
	for _, result := range results {
		resp = append(resp, &types.CharacterEdge{
			Cursor: result.ID(),
			Node:   types.MarshalCharacterToGraphQL(result),
		})
	}

	return &types.CharacterConnection{
		Edges: resp,
		PageInfo: &relay.PageInfo{
			HasNextPage:     paging.HasNextPage(),
			HasPreviousPage: paging.HasPrevPage(),
			StartCursor:     nil,
			EndCursor:       nil,
		},
	}, nil
}

func (r *QueryResolver) Posts(ctx context.Context, after *string, before *string, first *int, last *int, characterName *string, mediaTitle *string) (*types.PostConnection, error) {
	panic("implement me")
}
