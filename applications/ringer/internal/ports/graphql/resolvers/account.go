package resolvers

import (
	"context"
	"overdoll/applications/ringer/internal/app"
	"overdoll/applications/ringer/internal/app/query"
	"overdoll/applications/ringer/internal/domain/details"
	"overdoll/applications/ringer/internal/domain/payout"
	"overdoll/applications/ringer/internal/ports/graphql/types"
	"overdoll/libraries/passport"
	"overdoll/libraries/principal"
)

type AccountResolver struct {
	App *app.Application
}

func (r AccountResolver) Details(ctx context.Context, obj *types.Account) (*types.AccountDetails, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	result, err := r.App.Queries.AccountDetailsById.Handle(ctx, query.AccountDetailsById{
		Principal: principal.FromContext(ctx),
		AccountId: obj.ID.GetID(),
	})

	if err != nil {

		if err == details.ErrAccountDetailsNotFound {
			return nil, nil
		}

		return nil, err
	}

	return types.MarshalAccountDetailsToGraphQL(ctx, result), nil
}

func (r AccountResolver) PayoutMethod(ctx context.Context, obj *types.Account) (types.AccountPayoutMethod, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	result, err := r.App.Queries.AccountPayoutMethodById.Handle(ctx, query.AccountPayoutMethodById{
		Principal: principal.FromContext(ctx),
		AccountId: obj.ID.GetID(),
	})

	if err != nil {

		if err == payout.ErrAccountPayoutMethodNotFound {
			return nil, nil
		}

		return nil, err
	}

	return types.MarshalAccountPayoutMethodToGraphQL(ctx, result), nil
}
