package resolvers

import (
	"context"
	"overdoll/applications/ringer/internal/app"
	"overdoll/applications/ringer/internal/ports/graphql/types"
	"overdoll/libraries/passport"
)

type AccountResolver struct {
	App *app.Application
}

func (a AccountResolver) Details(ctx context.Context, obj *types.Account) (*types.AccountDetails, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

}

func (a AccountResolver) PayoutMethod(ctx context.Context, obj *types.Account) (types.AccountPayoutMethod, error) {
	//TODO implement me
	panic("implement me")
}
