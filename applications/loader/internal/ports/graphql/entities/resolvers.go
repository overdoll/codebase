package entities

import (
	"context"
	"overdoll/applications/loader/internal/app"
	"overdoll/applications/loader/internal/ports/graphql/dataloader"
	"overdoll/applications/loader/internal/ports/graphql/types"
	"overdoll/libraries/graphql/relay"
	"strings"
)

type EntityResolver struct {
	App *app.Application
}

func (e EntityResolver) FindResourceByID(ctx context.Context, id relay.ID) (*types.Resource, error) {
	return dataloader.For(ctx).GetResourceById(ctx, strings.Join([]string{id.GetCompositePartID(1), id.GetCompositePartID(0)}, "|"))
}
