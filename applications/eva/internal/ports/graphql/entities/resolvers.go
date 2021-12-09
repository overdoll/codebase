package entities

import (
	"context"
	"encoding/hex"
	"overdoll/applications/eva/internal/app"
	"overdoll/applications/eva/internal/app/query"
	"overdoll/applications/eva/internal/ports/graphql/dataloader"
	"overdoll/applications/eva/internal/ports/graphql/types"
	"overdoll/libraries/graphql/relay"
	"overdoll/libraries/passport"
	"overdoll/libraries/principal"
)

type EntityResolver struct {
	App *app.Application
}

func (r EntityResolver) FindAccountByID(ctx context.Context, id relay.ID) (*types.Account, error) {
	return dataloader.For(ctx).AccountById.Load(id.GetID())
}

func (r EntityResolver) FindModeratorByID(ctx context.Context, id relay.ID) (*types.Moderator, error) {

	acc, err := dataloader.For(ctx).AccountById.Load(id.GetID())

	if err != nil {
		return nil, err
	}

	return &types.Moderator{
		ID:      id,
		Account: acc,
	}, nil
}

func (r EntityResolver) FindAccountEmailByID(ctx context.Context, id relay.ID) (*types.AccountEmail, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	email, err := r.App.Queries.AccountEmailByEmail.Handle(ctx, query.AccountEmailByEmail{
		Principal: principal.FromContext(ctx),
		AccountId: id.GetCompositePartID(1),
		Email:     id.GetCompositePartID(0),
	})

	if err != nil {
		return nil, err
	}

	return types.MarshalAccountEmailToGraphQL(email), nil
}

func (r EntityResolver) FindAccountSessionByID(ctx context.Context, id relay.ID) (*types.AccountSession, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	// id is hex encoded in marshalling because of issues with relay.id
	val, err := hex.DecodeString(id.GetID())

	if err != nil {
		return nil, err
	}

	sess, err := r.App.Queries.AccountSessionById.Handle(ctx, query.AccountSessionById{
		Principal: principal.FromContext(ctx),
		SessionId: string(val),
		Passport:  passport.FromContext(ctx),
	})

	if err != nil {
		return nil, err
	}

	return types.MarshalAccountSessionToGraphQL(sess), nil
}

func (r EntityResolver) FindAccountUsernameByID(ctx context.Context, id relay.ID) (*types.AccountUsername, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	username, err := r.App.Queries.AccountUsernameByUsername.Handle(ctx, query.AccountUsernameByUsername{
		Principal: principal.FromContext(ctx),
		AccountId: id.GetCompositePartID(1),
		Username:  id.GetCompositePartID(0),
	})

	if err != nil {
		return nil, err
	}

	return types.MarshalAccountUsernameToGraphQL(username), nil
}
