package resolvers

import (
	"context"
	"overdoll/applications/hades/internal/app"
	"overdoll/applications/hades/internal/app/query"
	"overdoll/applications/hades/internal/ports/graphql/types"
	"overdoll/libraries/principal"
)

type AccountTransactionResolver struct {
	App *app.Application
}

func (r AccountTransactionResolver) ClubSupporterSubscription(ctx context.Context, obj *types.AccountTransaction) (types.AccountClubSupporterSubscription, error) {

	if obj.ClubSupporterSubscription == nil {
		return nil, nil
	}

	result, err := r.App.Queries.AccountClubSupporterSubscriptionById.Handle(ctx, query.AccountClubSupporterSubscriptionById{
		Principal: principal.FromContext(ctx),
		Id:        obj.ClubSupporterSubscription.(*types.AccountActiveClubSupporterSubscription).ID.GetID(),
	})

	if err != nil {
		return nil, err
	}

	return types.MarshalAccountClubSupporterSubscriptionToGraphQL(ctx, result), nil
}
