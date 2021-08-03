package queries

import (
	"context"

	"github.com/vektah/gqlparser/v2/gqlerror"
	"overdoll/applications/sting/internal/app"
	"overdoll/applications/sting/internal/app/query"
	"overdoll/applications/sting/internal/domain/post"
	"overdoll/applications/sting/internal/ports/graphql/types"
	"overdoll/libraries/graphql/relay"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
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

	results, err := r.App.Queries.SearchPosts.Handle(ctx, query.SearchPosts{
		Cursor:        cursor,
		ModeratorId:   nil,
		ContributorId: nil,
		ArtistId:      nil,
		CategoryIds:   categoryIdsString,
		CharacterIds:  characterIdsString,
		MediaIds:      mediaIdsString,
		Principal:     principal.FromContext(ctx),
	})

	if err != nil {
		return nil, err
	}

	return types.MarshalPostToGraphQLConnection(results, cursor), nil
}

func (r *QueryResolver) Post(ctx context.Context, reference string) (*types.Post, error) {

	pendingPost, err := r.App.Queries.PostById.Handle(ctx, query.PostById{
		PostId:    reference,
		Principal: principal.FromContext(ctx),
	})

	if err != nil {

		if err == post.ErrNotFound {
			return nil, nil
		}

		return nil, err
	}

	return types.MarshalPostToGraphQL(pendingPost), nil
}

func (r *QueryResolver) Categories(ctx context.Context, after *string, before *string, first *int, last *int, title *string) (*types.CategoryConnection, error) {

	cursor, err := paging.NewCursor(after, before, first, last)

	if err != nil {
		return nil, gqlerror.Errorf(err.Error())
	}

	results, err := r.App.Queries.SearchCategories.Handle(ctx, query.SearchCategories{
		Cursor: cursor,
		Title:  title,
	})

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

	results, err := r.App.Queries.SearchMedias.Handle(ctx, query.SearchMedias{
		Cursor: cursor,
		Title:  title,
	})

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

	results, err := r.App.Queries.SearchCharacters.Handle(ctx, query.SearchCharacters{
		Cursor: cursor,
		Name:   name,
	})

	if err != nil {
		return nil, err
	}

	return types.MarshalCharacterToGraphQLConnection(results, cursor), nil
}
