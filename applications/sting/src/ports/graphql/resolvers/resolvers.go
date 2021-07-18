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

func (a AccountResolver) PendingPostsForModerator(ctx context.Context, obj *types.Account, after *string, before *string, first *int, last *int) (*types.PendingPostConnection, error) {

	cursor, err := paging.NewCursor(after, before, first, last)

	if err != nil {
		return nil, gqlerror.Errorf(err.Error())
	}

	results, page, err := a.App.Queries.GetPendingPostsForModerator.Handle(ctx, cursor, obj.ID.GetID())

	if err != nil {
		return nil, err
	}

	return types.MarshalPendingPostToGraphQLConnection(results, page), nil
}

func (a AccountResolver) PendingPosts(ctx context.Context, obj *types.Account, after *string, before *string, first *int, last *int) (*types.PendingPostConnection, error) {
	return nil, nil
}

func (a AccountResolver) Posts(ctx context.Context, obj *types.Account, after *string, before *string, first *int, last *int) (*types.PostConnection, error) {
	return nil, nil
}

func (a AccountResolver) Contributions(ctx context.Context, obj *types.Account, after *string, before *string, first *int, last *int) (*types.PostConnection, error) {
	return nil, nil
}
