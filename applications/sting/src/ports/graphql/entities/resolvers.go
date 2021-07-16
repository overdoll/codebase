package entities

import (
	"context"

	"overdoll/applications/sting/src/app"
	"overdoll/applications/sting/src/ports/graphql/types"
)

type EntityResolver struct {
	App *app.Application
}

func (e EntityResolver) FindAccountByID(ctx context.Context, id string) (*types.Account, error) {
	return &types.Account{ID: id}, nil
}
