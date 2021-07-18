package entities

import (
	"context"

	"overdoll/applications/sting/src/app"
	"overdoll/applications/sting/src/ports/graphql/types"
	"overdoll/libraries/graphql/relay"
)

type EntityResolver struct {
	App *app.Application
}

func (e EntityResolver) FindAccountByID(ctx context.Context, id relay.ID) (*types.Account, error) {
	return &types.Account{
		ID: id,
	}, nil
}
