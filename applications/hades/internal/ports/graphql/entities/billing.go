package entities

import (
	"context"
	"overdoll/applications/hades/internal/app/query"
	"overdoll/applications/hades/internal/ports/graphql/types"
	"overdoll/libraries/graphql/relay"
	"overdoll/libraries/passport"
	"overdoll/libraries/principal"
)

func (r EntityResolver) FindAccountActiveClubSupporterSubscriptionByID(ctx context.Context, id relay.ID) (*types.AccountActiveClubSupporterSubscription, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	result, err := r.App.Queries.AccountClubSupporterSubscriptionById.Handle(ctx, query.AccountClubSupporterSubscriptionById{
		Principal: principal.FromContext(ctx),
		Id:        id.GetID(),
	})

	if err != nil {
		return nil, err
	}

	return types.MarshalAccountClubSupporterSubscriptionToGraphQL(ctx, result).(*types.AccountActiveClubSupporterSubscription), nil
}

func (r EntityResolver) FindAccountCancelledClubSupporterSubscriptionByID(ctx context.Context, id relay.ID) (*types.AccountCancelledClubSupporterSubscription, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	result, err := r.App.Queries.AccountClubSupporterSubscriptionById.Handle(ctx, query.AccountClubSupporterSubscriptionById{
		Principal: principal.FromContext(ctx),
		Id:        id.GetID(),
	})

	if err != nil {
		return nil, err
	}

	return types.MarshalAccountClubSupporterSubscriptionToGraphQL(ctx, result).(*types.AccountCancelledClubSupporterSubscription), nil
}

func (r EntityResolver) FindAccountExpiredClubSupporterSubscriptionByID(ctx context.Context, id relay.ID) (*types.AccountExpiredClubSupporterSubscription, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	result, err := r.App.Queries.AccountClubSupporterSubscriptionById.Handle(ctx, query.AccountClubSupporterSubscriptionById{
		Principal: principal.FromContext(ctx),
		Id:        id.GetID(),
	})

	if err != nil {
		return nil, err
	}

	return types.MarshalAccountClubSupporterSubscriptionToGraphQL(ctx, result).(*types.AccountExpiredClubSupporterSubscription), nil
}

func (r EntityResolver) FindAccountTransactionByID(ctx context.Context, id relay.ID) (*types.AccountTransaction, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	result, err := r.App.Queries.AccountTransactionById.Handle(ctx, query.AccountTransactionById{
		Principal: principal.FromContext(ctx),
		Id:        id.GetID(),
	})

	if err != nil {
		return nil, err
	}

	return types.MarshalAccountTransactionToGraphQL(ctx, result), nil
}
