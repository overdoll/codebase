package entities

import (
	"context"

	"overdoll/applications/eva/src/app"
	"overdoll/applications/eva/src/ports/graphql/dataloader"
	"overdoll/applications/eva/src/ports/graphql/types"
	"overdoll/libraries/graphql/relay"
)

type EntityResolver struct {
	App *app.Application
}

func (r EntityResolver) FindAccountByID(ctx context.Context, id relay.ID) (*types.Account, error) {
	return dataloader.For(ctx).AccountById.Load(id.GetID())
}

func (r EntityResolver) FindArtistByID(ctx context.Context, id relay.ID) (*types.Artist, error) {

	acc, err := r.App.Queries.AccountById.Handle(ctx, id.GetID())

	if err != nil {
		return nil, err
	}

	return &types.Artist{
		ID:      id,
		Account: types.MarshalAccountToGraphQL(acc),
	}, nil
}

func (r EntityResolver) FindContributorByID(ctx context.Context, id relay.ID) (*types.Contributor, error) {

	acc, err := r.App.Queries.AccountById.Handle(ctx, id.GetID())

	if err != nil {
		return nil, err
	}

	return &types.Contributor{
		ID:      id,
		Account: types.MarshalAccountToGraphQL(acc),
	}, nil
}

func (r EntityResolver) FindModeratorByID(ctx context.Context, id relay.ID) (*types.Moderator, error) {

	acc, err := r.App.Queries.AccountById.Handle(ctx, id.GetID())

	if err != nil {
		return nil, err
	}

	return &types.Moderator{
		ID:      id,
		Account: types.MarshalAccountToGraphQL(acc),
	}, nil
}

func (r EntityResolver) FindAccountEmailByID(ctx context.Context, id relay.ID) (*types.AccountEmail, error) {

	email, err := r.App.Queries.AccountEmailByEmail.Handle(ctx, id.GetCompositePartID(1), id.GetCompositePartID(0))

	if err != nil {
		return nil, err
	}

	return types.MarshalAccountEmailToGraphQL(email), nil
}

func (r EntityResolver) FindAccountSessionByID(ctx context.Context, id relay.ID) (*types.AccountSession, error) {

	session, err := r.App.Queries.AccountSessionById.Handle(ctx, id.GetID())

	if err != nil {
		return nil, err
	}

	return types.MarshalAccountSessionToGraphQL(session), nil
}

func (r EntityResolver) FindAccountUsernameByID(ctx context.Context, id relay.ID) (*types.AccountUsername, error) {

	username, err := r.App.Queries.AccountUsernameByUsername.Handle(ctx, id.GetCompositePartID(1), id.GetCompositePartID(0))

	if err != nil {
		return nil, err
	}

	return types.MarshalAccountUsernameToGraphQL(username), nil
}
