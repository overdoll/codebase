package resolvers

import (
	"context"
	"overdoll/applications/hades/internal/app"
	"overdoll/applications/hades/internal/app/query"
	"overdoll/applications/hades/internal/domain/billing"
	"overdoll/applications/hades/internal/ports/graphql/types"
)

type CCBillTransactionDetailsResolver struct {
	App *app.Application
}

func (r CCBillTransactionDetailsResolver) LinkedAccountClubSupporterSubscription(ctx context.Context, obj *types.CCBillTransactionDetails) (*types.AccountClubSupporterSubscription, error) {

	result, err := r.App.Queries.ClubSupporterSubscriptionFinalized.Handle(ctx, query.ClubSupporterSubscriptionFinalized{
		ClubId:    obj.ID.GetCompositePartID(1),
		AccountId: obj.ID.GetCompositePartID(2),
	})

	if err != nil {

		if err == billing.ErrAccountClubSupportSubscriptionNotFound {
			return nil, nil
		}

		return nil, err
	}

	return types.MarshalAccountClubSupporterSubscriptionToGraphQL(ctx, result), nil
}
