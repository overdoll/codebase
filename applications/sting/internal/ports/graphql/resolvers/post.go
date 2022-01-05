package resolvers

import (
	"context"
	"overdoll/applications/sting/internal/app"
	"overdoll/applications/sting/internal/ports/graphql/types"
)

type PostResolver struct {
	App *app.Application
}

func (p PostResolver) Content(ctx context.Context, obj *types.Post) ([]*types.Resource, error) {
	return obj.Content, nil
}
