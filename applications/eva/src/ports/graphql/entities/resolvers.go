package entities

import (
	"context"

	"overdoll/applications/eva/src/app"
	"overdoll/applications/eva/src/ports/graphql/types"
)

type EntityResolver struct {
	App *app.Application
}

func (e EntityResolver) FindViewerByID(ctx context.Context, id string) (*types.Viewer, error) {
	panic("implement me")
}

func (e EntityResolver) FindAccountSettingsByAccountID(ctx context.Context, accountID string) (*types.AccountSettings, error) {
	panic("implement me")
}
