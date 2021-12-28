package resolvers

import (
	"context"
	"overdoll/applications/sting/internal/app"
	"overdoll/applications/sting/internal/app/query"
	"overdoll/applications/sting/internal/ports/graphql/types"
	"overdoll/libraries/principal"
)

type PostResolver struct {
	App *app.Application
}

func (r PostResolver) Club(ctx context.Context, obj *types.Post) (*types.Club, error) {

	clb, err := r.App.Queries.ClubById.Handle(ctx, query.ClubById{
		Principal: principal.FromContext(ctx),
		Id:        obj.Club.ID.GetID(),
	})

	if err != nil {
		return nil, err
	}

	return types.MarshalClubToGraphQL(ctx, clb), nil
}
