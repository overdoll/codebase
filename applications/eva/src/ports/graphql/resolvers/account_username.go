package resolvers

import (
	"context"

	"overdoll/applications/eva/src/app"
	"overdoll/applications/eva/src/ports/graphql/types"
)

type AccountUsernameResolver struct {
	App *app.Application
}

func (r AccountUsernameResolver) Account(ctx context.Context, obj *types.AccountUsername) (*types.Account, error) {

	acc, err := r.App.Queries.AccountByUsername.Handle(ctx, obj.ID.GetID())

	if err != nil {
		return nil, err
	}

	return types.MarshalAccountToGraphQL(acc), nil
}
