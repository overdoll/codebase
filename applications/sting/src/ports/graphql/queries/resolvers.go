package queries

import (
	"context"

	"github.com/vektah/gqlparser/v2/gqlerror"
	"overdoll/applications/sting/src/app"
	"overdoll/applications/sting/src/ports/graphql/types"
	"overdoll/libraries/paging"
)

type QueryResolver struct {
	App *app.Application
}

func (r *QueryResolver) Artists(ctx context.Context, after *string, before *string, first *int, last *int, username *string) (*types.ArtistConnection, error) {

	cursor, err := paging.NewCursor(after, before, first, last)

	if err != nil {
		return nil, gqlerror.Errorf(err.Error())
	}

	search := ""

	if username != nil {
		search = *username
	}

	results, page, err := r.App.Queries.SearchArtist.Handle(ctx, cursor, search)

	if err != nil {
		return nil, err
	}

	return types.MarshalArtistToGraphQLConnection(results, page), nil
}

func (r *QueryResolver) Categories(ctx context.Context, after *string, before *string, first *int, last *int, name *string) (*types.CategoryConnection, error) {

	cursor, err := paging.NewCursor(after, before, first, last)

	if err != nil {
		return nil, gqlerror.Errorf(err.Error())
	}

	search := ""

	if name != nil {
		search = *name
	}

	results, page, err := r.App.Queries.SearchCategories.Handle(ctx, cursor, search)

	if err != nil {
		return nil, err
	}

	return types.MarshalCategoryToGraphQLConnection(results, page), nil
}

func (r *QueryResolver) Medias(ctx context.Context, after *string, before *string, first *int, last *int, title *string) (*types.MediaConnection, error) {

	cursor, err := paging.NewCursor(after, before, first, last)

	if err != nil {
		return nil, gqlerror.Errorf(err.Error())
	}

	search := ""

	if title != nil {
		search = *title
	}

	results, page, err := r.App.Queries.SearchMedias.Handle(ctx, cursor, search)

	if err != nil {
		return nil, err
	}

	return types.MarshalMediaToGraphQLConnection(results, page), nil
}

func (r *QueryResolver) Characters(ctx context.Context, after *string, before *string, first *int, last *int, name *string, mediaTitle *string) (*types.CharacterConnection, error) {

	cursor, err := paging.NewCursor(after, before, first, last)

	if err != nil {
		return nil, gqlerror.Errorf(err.Error())
	}

	search := ""

	if name != nil {
		search = *name
	}

	results, page, err := r.App.Queries.SearchCharacters.Handle(ctx, cursor, search)

	if err != nil {
		return nil, err
	}

	return types.MarshalCharacterToGraphQLConnection(results, page), nil
}

func (r *QueryResolver) Posts(ctx context.Context, after *string, before *string, first *int, last *int, characterName *string, mediaTitle *string) (*types.PostConnection, error) {
	panic("implement me")
}
