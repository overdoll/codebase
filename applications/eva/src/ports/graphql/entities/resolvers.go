package entities

import (
	"context"

	"overdoll/applications/eva/src/app"
	"overdoll/applications/eva/src/ports/graphql/types"
)

type EntityResolver struct {
	App *app.Application
}

// these entities are the base entities so they are never resolved
func (e EntityResolver) FindAccountByID(ctx context.Context, id string) (*types.Account, error) {
	panic("implement me")
}

func (e EntityResolver) FindAccountSettingsByAccountID(ctx context.Context, accountID string) (*types.AccountSettings, error) {
	panic("implement me")
}
