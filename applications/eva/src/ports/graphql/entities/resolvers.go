package entities

import (
	"context"

	"overdoll/applications/eva/src/app"
	"overdoll/applications/eva/src/ports/graphql/types"
)

type EntityResolver struct {
	App *app.Application
}

func (e EntityResolver) FindUserByID(ctx context.Context, id string) (*types.User, error) {

	acc, err := e.App.Queries.GetAccount.Handle(ctx, id)

	if err != nil {
		return nil, err
	}

	return types.MarshalUserToGraphQL(acc), nil
}
