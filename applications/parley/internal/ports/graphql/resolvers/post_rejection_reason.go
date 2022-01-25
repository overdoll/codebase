package resolvers

import (
	"context"
	"overdoll/applications/parley/internal/app"
	"overdoll/applications/parley/internal/app/query"
	"overdoll/applications/parley/internal/ports/graphql/types"
	"overdoll/libraries/principal"
)

type PostRejectionReasonResolver struct {
	App *app.Application
}

func (r PostRejectionReasonResolver) ClubInfractionReason(ctx context.Context, obj *types.PostRejectionReason) (*types.ClubInfractionReason, error) {

	if obj.ClubInfractionReason != nil {

		result, err := r.App.Queries.ClubInfractionReasonById.Handle(ctx, query.ClubInfractionReasonById{
			Principal: principal.FromContext(ctx),
			ReasonId:  obj.ClubInfractionReason.ID.GetID(),
		})

		if err != nil {
			return nil, err
		}

		return types.MarshalClubInfractionReasonToGraphQL(ctx, result), nil
	}

	return nil, nil
}
