package resolvers

import (
	"context"
	"github.com/vektah/gqlparser/v2/gqlerror"
	"overdoll/applications/ringer/internal/app"
	"overdoll/applications/ringer/internal/app/query"
	"overdoll/applications/ringer/internal/ports/graphql/types"
	"overdoll/libraries/paging"
	"overdoll/libraries/passport"
	"overdoll/libraries/principal"
)

type ClubResolver struct {
	App *app.Application
}

func (r ClubResolver) PlatformFee(ctx context.Context, obj *types.Club) (*types.ClubPlatformFee, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	result, err := r.App.Queries.PlatformFeeByClubId.Handle(ctx, query.PlatformFeeByClubId{
		Principal: principal.FromContext(ctx),
		ClubId:    obj.ID.GetID(),
	})

	if err != nil {
		return nil, err
	}

	return types.MarshalClubPlatformFeeToGraphQL(ctx, result), nil
}

func (r ClubResolver) Balance(ctx context.Context, obj *types.Club) (*types.Balance, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	result, err := r.App.Queries.ClubBalanceById.Handle(ctx, query.ClubBalanceById{
		Principal: principal.FromContext(ctx),
		Id:        obj.ID.GetID(),
	})

	if err != nil {
		return nil, err
	}

	return types.MarshalClubBalanceToGraphQL(ctx, result), nil
}

func (r ClubResolver) PendingBalance(ctx context.Context, obj *types.Club) (*types.Balance, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	result, err := r.App.Queries.ClubPendingBalanceById.Handle(ctx, query.ClubPendingBalanceById{
		Principal: principal.FromContext(ctx),
		Id:        obj.ID.GetID(),
	})

	if err != nil {
		return nil, err
	}

	return types.MarshalClubBalanceToGraphQL(ctx, result), nil
}

func (r ClubResolver) Payments(ctx context.Context, obj *types.Club, after *string, before *string, first *int, last *int, status []types.ClubPaymentStatus) (*types.ClubPaymentConnection, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	cursor, err := paging.NewCursor(after, before, first, last)

	if err != nil {
		return nil, gqlerror.Errorf(err.Error())
	}

	var statuses []string

	for _, s := range status {
		statuses = append(statuses, s.String())
	}

	cid := obj.ID.GetID()

	result, err := r.App.Queries.SearchClubPayments.Handle(ctx, query.SearchClubPayments{
		Principal: principal.FromContext(ctx),
		Cursor:    cursor,
		Status:    statuses,
		ClubId:    &cid,
	})

	if err != nil {
		return nil, err
	}

	return types.MarshalClubPaymentsToGraphQLConnection(ctx, result, cursor), nil
}

func (r ClubResolver) Payouts(ctx context.Context, obj *types.Club, after *string, before *string, first *int, last *int, status []types.ClubPayoutStatus) (*types.ClubPayoutConnection, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	cursor, err := paging.NewCursor(after, before, first, last)

	if err != nil {
		return nil, gqlerror.Errorf(err.Error())
	}

	var statuses []string

	for _, s := range status {
		statuses = append(statuses, s.String())
	}

	cid := obj.ID.GetID()

	result, err := r.App.Queries.SearchClubPayouts.Handle(ctx, query.SearchClubPayouts{
		Principal: principal.FromContext(ctx),
		Cursor:    cursor,
		Status:    statuses,
		ClubId:    &cid,
	})

	if err != nil {
		return nil, err
	}

	return types.MarshalClubPayoutsToGraphQLConnection(ctx, result, cursor), nil
}
