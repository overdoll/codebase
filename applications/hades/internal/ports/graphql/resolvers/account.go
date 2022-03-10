package resolvers

import (
	"context"
	"github.com/vektah/gqlparser/v2/gqlerror"
	"overdoll/applications/hades/internal/app"
	"overdoll/applications/hades/internal/app/query"
	"overdoll/applications/hades/internal/ports/graphql/types"
	"overdoll/libraries/paging"
	"overdoll/libraries/passport"
	"overdoll/libraries/principal"
	"time"
)

type AccountResolver struct {
	App *app.Application
}

func (r AccountResolver) ExpiredClubSupporterSubscriptions(ctx context.Context, obj *types.Account, after *string, before *string, first *int, last *int) (*types.ExpiredAccountClubSupporterSubscriptionConnection, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	cursor, err := paging.NewCursor(after, before, first, last)

	if err != nil {
		return nil, gqlerror.Errorf(err.Error())
	}

	results, err := r.App.Queries.ExpiredAccountClubSupporterSubscriptionsByAccount.
		Handle(
			ctx,
			query.ExpiredAccountClubSupporterSubscriptionsByAccount{
				Principal: principal.FromContext(ctx),
				Cursor:    cursor,
				AccountId: obj.ID.GetID(),
			},
		)

	if err != nil {
		return nil, err
	}

	return types.MarshalExpiredAccountClubSupporterSubscriptionToGraphQLConnection(ctx, results, cursor), nil
}

func (r AccountResolver) ClubSupporterSubscriptions(ctx context.Context, obj *types.Account, after *string, before *string, first *int, last *int) (*types.AccountClubSupporterSubscriptionConnection, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	cursor, err := paging.NewCursor(after, before, first, last)

	if err != nil {
		return nil, gqlerror.Errorf(err.Error())
	}

	results, err := r.App.Queries.AccountClubSupporterSubscriptionsByAccount.
		Handle(
			ctx,
			query.AccountClubSupporterSubscriptionsByAccount{
				Principal: principal.FromContext(ctx),
				Cursor:    cursor,
				AccountId: obj.ID.GetID(),
			},
		)

	if err != nil {
		return nil, err
	}

	return types.MarshalAccountClubSupporterSubscriptionToGraphQLConnection(ctx, results, cursor), nil
}

func (r AccountResolver) SavedPaymentMethods(ctx context.Context, obj *types.Account, after *string, before *string, first *int, last *int) (*types.AccountSavedPaymentMethodConnection, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	cursor, err := paging.NewCursor(after, before, first, last)

	if err != nil {
		return nil, gqlerror.Errorf(err.Error())
	}

	results, err := r.App.Queries.AccountSavedPaymentMethods.
		Handle(
			ctx,
			query.AccountSavedPaymentMethods{
				Principal: principal.FromContext(ctx),
				Cursor:    cursor,
				AccountId: obj.ID.GetID(),
			},
		)

	if err != nil {
		return nil, err
	}

	return types.MarshalAccountSavedPaymentMethodsToGraphQLConnection(ctx, results, cursor), nil
}

func (r AccountResolver) TransactionHistory(ctx context.Context, obj *types.Account, after *string, before *string, first *int, last *int, startDate time.Time, endDate *time.Time) (*types.AccountTransactionHistoryConnection, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	cursor, err := paging.NewCursor(after, before, first, last)

	if err != nil {
		return nil, gqlerror.Errorf(err.Error())
	}

	results, err := r.App.Queries.SearchAccountTransactionHistory.
		Handle(
			ctx,
			query.SearchAccountTransactionHistory{
				Principal: principal.FromContext(ctx),
				Cursor:    cursor,
				AccountId: obj.ID.GetID(),
				From:      startDate,
				To:        endDate,
			},
		)

	if err != nil {
		return nil, err
	}

	return types.MarshalAccountTransactionHistoryToGraphQLConnection(ctx, results, cursor), nil
}
