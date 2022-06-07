package resolvers

import (
	"context"
	"overdoll/applications/hades/internal/app"
	"overdoll/applications/hades/internal/app/query"
	"overdoll/applications/hades/internal/ports/graphql/types"
	"overdoll/libraries/errors/apperror"
	"overdoll/libraries/passport"
	"overdoll/libraries/principal"
)

type CCBillTransactionDetailsResolver struct {
	App *app.Application
}

func (r CCBillTransactionDetailsResolver) LinkedAccountClubSupporterSubscription(ctx context.Context, obj *types.CCBillTransactionDetails) (types.AccountClubSupporterSubscription, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	result, err := r.App.Queries.AccountClubSupporterSubscriptionByAccountAndClubId.Handle(ctx, query.AccountClubSupporterSubscriptionByAccountAndClubId{
		Principal: principal.FromContext(ctx),
		AccountId: obj.ID.GetCompositePartID(2),
		ClubId:    obj.ID.GetCompositePartID(1),
	})

	if err != nil {

		if apperror.IsNotFoundError(err) {
			return nil, nil
		}

		return nil, err
	}

	return types.MarshalAccountClubSupporterSubscriptionToGraphQL(ctx, result), nil
}
