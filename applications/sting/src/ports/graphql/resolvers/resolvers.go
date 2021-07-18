package resolvers

import (
	"context"

	"overdoll/applications/sting/src/app"
	"overdoll/applications/sting/src/ports/graphql/types"
	"overdoll/libraries/graphql/relay"
)

type AccountResolver struct {
	App *app.Application
}

func (a AccountResolver) PendingPostsForModerator(ctx context.Context, obj *types.Account, after *string, before *string, first *int, last *int) (*types.PendingPostConnection, error) {

	cursor, err := relay.NewCursor(after, before, first, last)

	if err != nil {
		return nil, err
	}

	results, paging, err := a.App.Queries.GetPendingPostsForModerator.Handle(ctx, cursor, obj.ID.GetID())

	if err != nil {
		return nil, err
	}

	return &types.PendingPostConnection{
		Edges:    types.MarshalPendingPostToGraphQLEdges(results),
		PageInfo: paging.ToPageInfo(),
	}, nil
}

func (a AccountResolver) PendingPosts(ctx context.Context, obj *types.Account, after *string, before *string, first *int, last *int) (*types.PendingPostConnection, error) {
	panic("implement me")
}

func (a AccountResolver) Posts(ctx context.Context, obj *types.Account, after *string, before *string, first *int, last *int) (*types.PostConnection, error) {
	panic("implement me")
}

func (a AccountResolver) Contributions(ctx context.Context, obj *types.Account, after *string, before *string, first *int, last *int) (*types.PostConnection, error) {
	panic("implement me")
}
