package entities

import (
	"context"

	"overdoll/applications/eva/src/app"
	"overdoll/applications/eva/src/ports/graphql/types"
	"overdoll/libraries/graphql/relay"
)

type EntityResolver struct {
	App *app.Application
}

func (r EntityResolver) FindAccountByID(ctx context.Context, id relay.ID) (*types.Account, error) {
	return &types.Account{ID: id}, nil
}

func (r EntityResolver) FindAccountEmailByID(ctx context.Context, id relay.ID) (*types.AccountEmail, error) {
	return nil, nil
}

func (r EntityResolver) FindAccountSessionByID(ctx context.Context, id relay.ID) (*types.AccountSession, error) {
	return nil, nil
}

func (r EntityResolver) FindAccountUsernameByID(ctx context.Context, id relay.ID) (*types.AccountUsername, error) {
	return nil, nil
}
