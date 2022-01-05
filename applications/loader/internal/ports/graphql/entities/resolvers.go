package entities

import (
	"context"
	"overdoll/applications/loader/internal/app"
	"overdoll/applications/loader/internal/app/query"
	"overdoll/applications/loader/internal/ports/graphql/types"
	"overdoll/libraries/graphql/relay"
)

type EntityResolver struct {
	App *app.Application
}

func (e EntityResolver) FindResourceByID(ctx context.Context, id relay.ID) (*types.Resource, error) {

	res, err := e.App.Queries.ResourceById.Handle(ctx, query.ResourceById{
		ItemId:     id.GetCompositePartID(1),
		ResourceId: id.GetCompositePartID(0),
	})

	if err != nil {
		return nil, err
	}

	return types.MarshalResourceToGraphQL(ctx, res), nil
}
