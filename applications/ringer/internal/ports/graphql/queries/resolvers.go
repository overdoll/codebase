package queries

import (
	"context"
	"github.com/vektah/gqlparser/v2/gqlerror"
	"overdoll/applications/ringer/internal/app"
	"overdoll/applications/ringer/internal/app/query"
	"overdoll/applications/ringer/internal/domain/payment"
	"overdoll/applications/ringer/internal/domain/payout"
	"overdoll/applications/ringer/internal/ports/graphql/types"
	"overdoll/libraries/paging"
	"overdoll/libraries/passport"
	"overdoll/libraries/principal"
)

type QueryResolver struct {
	App *app.Application
}

func (r QueryResolver) Countries(ctx context.Context) ([]*types.Country, error) {
	//TODO implement me
	panic("implement me")
}

func (r QueryResolver) Payment(ctx context.Context, reference string) (*types.ClubPayment, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	result, err := r.App.Queries.ClubPaymentById.Handle(ctx, query.ClubPaymentById{
		Principal: principal.FromContext(ctx),
		Id:        reference,
	})

	if err != nil {

		if err == payment.ErrClubPaymentNotFound {
			return nil, nil
		}

		return nil, err
	}

	return types.MarshalClubPaymentToGraphQL(ctx, result), nil
}

func (r QueryResolver) Payments(ctx context.Context, after *string, before *string, first *int, last *int, status []types.ClubPaymentStatus) (*types.ClubPaymentConnection, error) {

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

	result, err := r.App.Queries.SearchClubPayments.Handle(ctx, query.SearchClubPayments{
		Principal: principal.FromContext(ctx),
		Cursor:    cursor,
		Status:    statuses,
	})

	if err != nil {
		return nil, err
	}

	return types.MarshalPaymentsConnectionToGraphQL(ctx, result), nil
}

func (r QueryResolver) Payout(ctx context.Context, reference string) (*types.ClubPayout, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	result, err := r.App.Queries.ClubPayoutById.Handle(ctx, query.ClubPayoutById{
		Principal: principal.FromContext(ctx),
		Id:        reference,
	})

	if err != nil {

		if err == payout.ErrClubPayoutNotFound {
			return nil, nil
		}

		return nil, err
	}

	return types.MarshalClubPayoutToGraphQL(ctx, result), nil
}

func (r QueryResolver) Payouts(ctx context.Context, after *string, before *string, first *int, last *int, status []types.ClubPayoutStatus) (*types.ClubPayoutConnection, error) {

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

	result, err := r.App.Queries.SearchClubPayouts.Handle(ctx, query.SearchClubPayouts{
		Principal: principal.FromContext(ctx),
		Cursor:    cursor,
		Status:    statuses,
	})

	if err != nil {
		return nil, err
	}

	return types.MarshalPaymentsConnectionToGraphQL(ctx, result), nil
}

func (r QueryResolver) DepositRequest(ctx context.Context, reference string) (*types.DepositRequest, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	result, err := r.App.Queries.DepositRequestById.Handle(ctx, query.DepositRequestById{
		Principal: principal.FromContext(ctx),
		Id:        reference,
	})

	if err != nil {

		if err == payout.ErrDepositRequestNotFound {
			return nil, nil
		}

		return nil, err
	}

	return types.MarshalDepositRequestToGraphQL(ctx, result), nil
}

func (r QueryResolver) DepositRequests(ctx context.Context, after *string, before *string, first *int, last *int) (*types.DepositRequestConnection, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	cursor, err := paging.NewCursor(after, before, first, last)

	if err != nil {
		return nil, gqlerror.Errorf(err.Error())
	}

	results, err := r.App.Queries.DepositRequests.Handle(ctx, query.DepositRequests{
		Principal: principal.FromContext(ctx),
		Cursor:    cursor,
	})

	if err != nil {
		return nil, err
	}

	return types.MarshalDepositRequestsToGraphQLConnection(ctx, results), nil
}
