package entities

import (
	"context"

	"overdoll/applications/eva/src/app"
	"overdoll/applications/eva/src/ports/graphql/types"
)

type EntityResolver struct {
	App *app.Application
}

// this entity would never be resolved - it's the base entity
func (e EntityResolver) FindAccountSettingsByAccountID(ctx context.Context, accountID string) (*types.AccountSettings, error) {
	panic("implement me")
}

// this entity would never be resolved - it's the base entity
func (e EntityResolver) FindUserByID(ctx context.Context, id string) (*types.User, error) {
	panic("implement me")

}
