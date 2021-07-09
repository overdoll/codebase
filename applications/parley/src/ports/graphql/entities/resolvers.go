package entities

import (
	"context"

	"overdoll/applications/parley/src/app"
	"overdoll/applications/parley/src/ports/graphql/types"
)

type EntityResolver struct {
	App *app.Application
}

func (e EntityResolver) FindAccountSettingsByAccountID(ctx context.Context, accountID string) (*types.AccountSettings, error) {
	res, err := e.App.Queries.ModeratorInQueue.Handle(ctx, accountID)

	if err != nil {
		return nil, err
	}

	return &types.AccountSettings{
		AccountID: accountID,
		Moderator: &types.AccountModeratorSettings{InQueue: res},
	}, nil
}
