package resolvers

import (
	"context"
	query2 "overdoll/applications/stella/internal/app/query"
	"overdoll/applications/sting/internal/app"
	"overdoll/applications/sting/internal/app/query"
	"overdoll/applications/sting/internal/ports/graphql/types"
	"overdoll/libraries/principal"
)

type PostResolver struct {
	App *app.Application
}

func (r PostResolver) Content(ctx context.Context, obj *types.Post) ([]types.Resource, error) {

	resources, err := r.App.Queries.ResourcesByIds.Handle(ctx, query.ResourcesByIds{
		ItemId:      obj.ID.GetID(),
		ResourceIds: types.GetResourceIdsFromResources(ctx, obj.Content),
	})

	if err != nil {
		return nil, err
	}

	rsize := types.ResourceSizesPortrait

	return types.MarshalResourcesToGraphQL(ctx, resources, &rsize), nil
}

func (r PostResolver) Club(ctx context.Context, obj *types.Post) (*types.Club, error) {

	clb, err := r.App.Queries.ClubById.Handle(ctx, query2.ClubById{
		Principal: principal.FromContext(ctx),
		Id:        obj.Club.ID.GetID(),
	})

	if err != nil {
		return nil, err
	}

	return types.MarshalClubToGraphQL(ctx, clb), nil
}
