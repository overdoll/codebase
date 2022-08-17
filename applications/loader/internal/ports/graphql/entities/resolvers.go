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
	return dataloader.For(ctx).GetResourceProgressById(ctx, id.GetCompositePartID(1), id.GetCompositePartID(0))
}
