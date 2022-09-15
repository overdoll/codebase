package entities

import (
	"context"
	"overdoll/applications/loader/internal/app"
	"overdoll/applications/loader/internal/ports/graphql/dataloader"
	"overdoll/applications/loader/internal/ports/graphql/types"
	"overdoll/libraries/graphql/relay"
)

type EntityResolver struct {
	App *app.Application
}

func (e EntityResolver) FindResourceProgressByID(ctx context.Context, id relay.ID) (*types.ResourceProgress, error) {

	res, err := dataloader.For(ctx).GetMediaProgressById(ctx, id.GetCompositePartID(1), id.GetCompositePartID(0))

	if err != nil {
		return nil, err
	}

	return types.MarshalMediaProgressToLegacyResourceProgressGraphQL(ctx, res), nil
}

func (e EntityResolver) FindMediaProgressByID(ctx context.Context, id relay.ID) (*types.MediaProgress, error) {
	return dataloader.For(ctx).GetMediaProgressById(ctx, id.GetCompositePartID(1), id.GetCompositePartID(0))
}
