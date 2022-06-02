package resolvers

import (
	"context"
	"overdoll/applications/hades/internal/app"
	"overdoll/applications/hades/internal/app/query"
	"overdoll/applications/hades/internal/ports/graphql/types"
	"overdoll/libraries/errors/domainerror"
	"overdoll/libraries/passport"
	"overdoll/libraries/principal"
)

type ClubMemberResolver struct {
	App *app.Application
}

func (r ClubMemberResolver) ClubSupporterSubscription(ctx context.Context, obj *types.ClubMember) (types.AccountClubSupporterSubscription, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	result, err := r.App.Queries.AccountClubSupporterSubscriptionByAccountAndClubId.Handle(ctx, query.AccountClubSupporterSubscriptionByAccountAndClubId{
		Principal: principal.FromContext(ctx),
		AccountId: obj.ID.GetCompositePartID(0),
		ClubId:    obj.ID.GetCompositePartID(1),
	})

	if err != nil {

		if domainerror.IsNotFoundError(err) {
			return nil, nil
		}

		return nil, err
	}

	return types.MarshalAccountClubSupporterSubscriptionToGraphQL(ctx, result), nil
}
