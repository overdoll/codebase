package resolvers

import (
	"context"

	"github.com/vektah/gqlparser/v2/gqlerror"
	"overdoll/applications/sting/internal/app"
	"overdoll/applications/sting/internal/app/query"
	"overdoll/applications/sting/internal/ports/graphql/types"
	"overdoll/libraries/paging"
)

type AccountResolver struct {
	App *app.Application
}

func (r AccountResolver) ModeratorPostsQueue(ctx context.Context, obj *types.Account, after *string, before *string, first *int, last *int) (*types.PostConnection, error) {

	cursor, err := paging.NewCursor(after, before, first, last)

	if err != nil {
		return nil, gqlerror.Errorf(err.Error())
	}

	moderatorId := obj.ID.GetID()

	results, err := r.App.Queries.SearchPosts.Handle(ctx, query.SearchPosts{
		Cursor:      cursor,
		ModeratorId: &moderatorId,
	})

	if err != nil {
		return nil, err
	}

	return types.MarshalPostToGraphQLConnection(results, cursor), nil
}

func (r AccountResolver) Posts(ctx context.Context, obj *types.Account, after *string, before *string, first *int, last *int) (*types.PostConnection, error) {

	cursor, err := paging.NewCursor(after, before, first, last)

	if err != nil {
		return nil, gqlerror.Errorf(err.Error())
	}

	artistId := obj.ID.GetID()

	results, err := r.App.Queries.SearchPosts.Handle(ctx, query.SearchPosts{
		Cursor:   cursor,
		ArtistId: &artistId,
	})

	if err != nil {
		return nil, err
	}

	return types.MarshalPostToGraphQLConnection(results, cursor), nil
}

func (r AccountResolver) Contributions(ctx context.Context, obj *types.Account, after *string, before *string, first *int, last *int) (*types.PostConnection, error) {

	cursor, err := paging.NewCursor(after, before, first, last)

	if err != nil {
		return nil, gqlerror.Errorf(err.Error())
	}

	contributorId := obj.ID.GetID()

	results, err := r.App.Queries.SearchPosts.Handle(ctx, query.SearchPosts{
		Cursor:        cursor,
		ContributorId: &contributorId,
	})
	
	if err != nil {
		return nil, err
	}

	return types.MarshalPostToGraphQLConnection(results, cursor), nil
}
