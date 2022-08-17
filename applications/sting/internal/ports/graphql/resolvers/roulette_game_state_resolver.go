package resolvers

import (
	"context"
	"overdoll/applications/sting/internal/app"
	"overdoll/applications/sting/internal/ports/graphql/dataloader"
	"overdoll/applications/sting/internal/ports/graphql/types"
)

type RouletteGameStateResolver struct {
	App *app.Application
}

func (r RouletteGameStateResolver) Post(ctx context.Context, obj *types.RouletteGameState) (*types.Post, error) {
	return dataloader.For(ctx).GetPostById(ctx, obj.Post.ID.GetID())
}
