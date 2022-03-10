package resolvers

import (
	"context"
	"overdoll/applications/hades/internal/app"
	"overdoll/applications/hades/internal/app/query"
	"overdoll/applications/hades/internal/ports/graphql/types"
)

type ExpiredAccountClubSupporterSubscriptionResolver struct {
	App *app.Application
}

func (r ExpiredAccountClubSupporterSubscriptionResolver) CancellationReason(ctx context.Context, obj *types.ExpiredAccountClubSupporterSubscription) (*types.CancellationReason, error) {

	result, err := r.App.Queries.CancellationReasonById.Handle(ctx, query.CancellationReasonById{
		ReasonId: obj.CancellationReason.ID.GetID(),
	})

	if err != nil {
		return nil, err
	}

	return types.MarshalCancellationReasonToGraphQL(ctx, result), nil
}
