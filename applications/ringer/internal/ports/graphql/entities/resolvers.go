package entities

import (
	"context"
	"overdoll/applications/ringer/internal/app"
	"overdoll/applications/ringer/internal/app/query"
	"overdoll/applications/ringer/internal/ports/graphql/types"
	"overdoll/libraries/graphql/relay"
	"overdoll/libraries/passport"
	"overdoll/libraries/principal"
)

type EntityResolver struct {
	App *app.Application
}

func (r EntityResolver) FindAccountByID(ctx context.Context, id relay.ID) (*types.Account, error) {
	return &types.Account{
		ID: id,
	}, nil
}

func (r EntityResolver) FindClubByID(ctx context.Context, id relay.ID) (*types.Club, error) {
	return &types.Club{
		ID: id,
	}, nil
}

func (r EntityResolver) FindClubPaymentByID(ctx context.Context, id relay.ID) (*types.ClubPayment, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	result, err := r.App.Queries.ClubPaymentById.Handle(ctx, query.ClubPaymentById{
		Principal: principal.FromContext(ctx),
		Id:        id.GetID(),
	})

	if err != nil {
		return nil, err
	}

	return types.MarshalClubPaymentToGraphQL(ctx, result), nil
}

func (r EntityResolver) FindClubPayoutByID(ctx context.Context, id relay.ID) (*types.ClubPayout, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	result, err := r.App.Queries.ClubPayoutById.Handle(ctx, query.ClubPayoutById{
		Principal: principal.FromContext(ctx),
		Id:        id.GetID(),
	})

	if err != nil {
		return nil, err
	}

	return types.MarshalClubPayoutToGraphQL(ctx, result), nil
}

func (r EntityResolver) FindDepositRequestByID(ctx context.Context, id relay.ID) (*types.DepositRequest, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	result, err := r.App.Queries.DepositRequestById.Handle(ctx, query.DepositRequestById{
		Principal: principal.FromContext(ctx),
		Id:        id.GetID(),
	})

	if err != nil {
		return nil, err
	}

	return types.MarshalDepositRequestToGraphQL(ctx, result), nil
}
