package resolvers

import (
	"context"

	"github.com/vektah/gqlparser/v2/gqlerror"
	"overdoll/applications/sting/src/app"
	"overdoll/applications/sting/src/ports/graphql/types"
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

	results, page, err := r.App.Queries.PostsByModerator.Handle(ctx, cursor, obj.ID.GetID())

	if err != nil {
		return nil, err
	}

	return types.MarshalPostToGraphQLConnection(results, page), nil
}

func (r AccountResolver) Posts(ctx context.Context, obj *types.Account, after *string, before *string, first *int, last *int) (*types.PostConnection, error) {

	cursor, err := paging.NewCursor(after, before, first, last)

	if err != nil {
		return nil, gqlerror.Errorf(err.Error())
	}

	results, page, err := r.App.Queries.PostsByArtist.Handle(ctx, cursor, obj.ID.GetID())

	if err != nil {
		return nil, err
	}

	return types.MarshalPostToGraphQLConnection(results, page), nil
}

func (r AccountResolver) Contributions(ctx context.Context, obj *types.Account, after *string, before *string, first *int, last *int) (*types.PostConnection, error) {

	cursor, err := paging.NewCursor(after, before, first, last)

	if err != nil {
		return nil, gqlerror.Errorf(err.Error())
	}

	results, page, err := r.App.Queries.PostsByContributor.Handle(ctx, cursor, obj.ID.GetID())

	if err != nil {
		return nil, err
	}

	return types.MarshalPostToGraphQLConnection(results, page), nil
}
