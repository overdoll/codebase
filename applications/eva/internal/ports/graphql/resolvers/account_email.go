package resolvers

import (
	"context"
	"overdoll/applications/eva/internal/app"
	"overdoll/applications/eva/internal/ports/graphql/types"
	"overdoll/libraries/errors/apperror"
)

type AccountEmailResolver struct {
	App *app.Application
}

func (r AccountEmailResolver) Account(ctx context.Context, obj *types.AccountEmail) (*types.Account, error) {

	acc, err := r.App.Queries.AccountByEmail.Handle(ctx, obj.ID.GetID())

	if err != nil {

		if apperror.IsNotFoundError(err) {
			return nil, nil
		}

		return nil, err
	}

	return types.MarshalAccountToGraphQL(ctx, acc), nil
}
