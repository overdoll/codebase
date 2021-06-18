package entities

import (
	"context"

	"overdoll/applications/sting/src/app"
	"overdoll/applications/sting/src/ports/graphql/types"
)

type EntityResolver struct {
	App *app.Application
}

func (e *EntityResolver) FindUserByID(ctx context.Context, id string) (*types.User, error) {

	var pendingPosts []*types.PendingPost

	return &types.User{
		ID:           id,
		PendingPosts: pendingPosts,
	}, nil
}
