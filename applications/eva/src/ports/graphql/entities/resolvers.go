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

	email, err := r.App.Queries.GetAccountEmail.Handle(ctx, id.GetCompositePartID(1), id.GetCompositePartID(0))

	if err != nil {
		return nil, err
	}

	return types.MarshalAccountEmailToGraphQL(email), nil
}

func (r EntityResolver) FindAccountSessionByID(ctx context.Context, id relay.ID) (*types.AccountSession, error) {

	session, err := r.App.Queries.GetAccountSession.Handle(ctx, id.GetID())

	if err != nil {
		return nil, err
	}

	return types.MarshalAccountSessionToGraphQL(session), nil
}

func (r EntityResolver) FindAccountUsernameByID(ctx context.Context, id relay.ID) (*types.AccountUsername, error) {
	username, err := r.App.Queries.GetAccountUsername.Handle(ctx, id.GetCompositePartID(1), id.GetCompositePartID(0))

	if err != nil {
		return nil, err
	}

	return types.MarshalAccountUsernameToGraphQL(username), nil
}
