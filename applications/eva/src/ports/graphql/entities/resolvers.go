package entities

import (
	"context"
	"fmt"

	"overdoll/applications/eva/src/app"
	"overdoll/applications/eva/src/ports/graphql/types"
	"overdoll/libraries/graphql/relay"
)

type EntityResolver struct {
	App *app.Application
}

func (e EntityResolver) FindAccountByID(ctx context.Context, id string) (*types.Account, error) {
	panic("implement me")
}

func (e EntityResolver) FindTestByID(ctx context.Context, accountID relay.ID) (*types.Test, error) {
	fmt.Println(accountID)
	return &types.Test{
		ID:   "test",
		Test: "",
	}, nil
}

func (e EntityResolver) FindViewerByID(ctx context.Context, id string) (*types.Viewer, error) {
	panic("implement me")
}

func (e EntityResolver) FindAccountSettingsByAccountID(ctx context.Context, accountID relay.ID) (*types.AccountSettings, error) {
	panic("implement me")
}
