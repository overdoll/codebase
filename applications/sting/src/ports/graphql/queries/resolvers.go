package queries

import (
	"context"

	"github.com/vektah/gqlparser/v2/gqlerror"
	"overdoll/applications/sting/src/app"
	"overdoll/applications/sting/src/ports/graphql/types"
	"overdoll/libraries/graphql/relay"
	"overdoll/libraries/paging"
)

type QueryResolver struct {
	App *app.Application
}

func (r *QueryResolver) Posts(ctx context.Context, after *string, before *string, first *int, last *int, categoryIds []relay.ID, characterIds []relay.ID, mediaIds []relay.ID) (*types.PostConnection, error) {

	cursor, err := paging.NewCursor(after, before, first, last)

	if err != nil {
		return nil, gqlerror.Errorf(err.Error())
	}

	var categoryIdsString []string

	for _, category := range categoryIds {
		categoryIdsString = append(categoryIdsString, category.GetID())
	}

	var characterIdsString []string

	for _, character := range characterIds {
		characterIdsString = append(characterIdsString, character.GetID())
	}

	var mediaIdsString []string

	for _, media := range mediaIds {
		mediaIdsString = append(mediaIdsString, media.GetID())
	}

	results, err := r.App.Queries.SearchPosts.Handle(ctx, cursor, "", "", "", categoryIdsString, characterIdsString, mediaIdsString)

	if err != nil {
		return nil, err
	}

	return types.MarshalPostToGraphQLConnection(results, cursor), nil
}

func (r *QueryResolver) Post(ctx context.Context, reference string) (*types.Post, error) {

	pendingPost, err := r.App.Queries.PostById.Handle(ctx, reference)

	if err != nil {
		return nil, err
	}

	return types.MarshalPostToGraphQL(pendingPost), nil
}

func (r *QueryResolver) Categories(ctx context.Context, after *string, before *string, first *int, last *int, title *string) (*types.CategoryConnection, error) {

	cursor, err := paging.NewCursor(after, before, first, last)

	if err != nil {
		return nil, gqlerror.Errorf(err.Error())
	}

	search := ""

	if title != nil {
		search = *title
	}

	results, err := r.App.Queries.SearchCategories.Handle(ctx, cursor, search)

	if err != nil {
		return nil, err
	}

	return types.MarshalCategoryToGraphQLConnection(results, cursor), nil
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

	results, err := r.App.Queries.SearchMedias.Handle(ctx, cursor, search)

	if err != nil {
		return nil, err
	}

	return types.MarshalMediaToGraphQLConnection(results, cursor), nil
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

	results, err := r.App.Queries.SearchCharacters.Handle(ctx, cursor, search)

	if err != nil {
		return nil, err
	}

	return types.MarshalCharacterToGraphQLConnection(results, cursor), nil
}
