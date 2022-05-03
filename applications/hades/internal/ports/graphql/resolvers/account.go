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

func (r AccountResolver) HasActiveOrCancelledAccountClubSupporterSubscriptions(ctx context.Context, obj *types.Account) (bool, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return false, err
	}

	result, err := r.App.Queries.HasActiveOrCancelledAccountClubSupporterSubscriptions.
		Handle(
			ctx,
			query.HasActiveOrCancelledAccountClubSupporterSubscriptions{
				Principal: principal.FromContext(ctx),
				AccountId: obj.ID.GetID(),
			},
		)

	if err != nil {
		return false, err
	}

	return *result, nil
}

func (r AccountResolver) ClubSupporterSubscriptions(ctx context.Context, obj *types.Account, after *string, before *string, first *int, last *int, status []types.AccountClubSupporterSubscriptionStatus) (*types.AccountClubSupporterSubscriptionConnection, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	cursor, err := paging.NewCursor(after, before, first, last)

	if err != nil {
		return nil, gqlerror.Errorf(err.Error())
	}

	var newStatus []string

	for _, s := range status {
		newStatus = append(newStatus, s.String())
	}

	results, err := r.App.Queries.SearchAccountClubSupporterSubscriptions.
		Handle(
			ctx,
			query.SearchAccountClubSupporterSubscriptions{
				Principal: principal.FromContext(ctx),
				Cursor:    cursor,
				AccountId: obj.ID.GetID(),
				Status:    newStatus,
			},
		)

	if err != nil {
		return nil, err
	}

	return types.MarshalAccountClubSupporterSubscriptionToGraphQLConnection(ctx, results, cursor), nil
}

func (r AccountResolver) TransactionsTotalCount(ctx context.Context, obj *types.Account) (int, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return 0, err
	}

	result, err := r.App.Queries.AccountTransactionsTotalCount.
		Handle(
			ctx,
			query.AccountTransactionsTotalCount{
				Principal: principal.FromContext(ctx),
				AccountId: obj.ID.GetID(),
			},
		)

	if err != nil {
		return 0, err
	}

	return int(*result), nil
}

func (r AccountResolver) TransactionsPaymentCount(ctx context.Context, obj *types.Account) (int, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return 0, err
	}

	result, err := r.App.Queries.AccountTransactionsPaymentCount.
		Handle(
			ctx,
			query.AccountTransactionsPaymentCount{
				Principal: principal.FromContext(ctx),
				AccountId: obj.ID.GetID(),
			},
		)

	if err != nil {
		return 0, err
	}

	return int(*result), nil
}

func (r AccountResolver) TransactionsRefundCount(ctx context.Context, obj *types.Account) (int, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return 0, err
	}

	result, err := r.App.Queries.AccountTransactionsRefundCount.
		Handle(
			ctx,
			query.AccountTransactionsRefundCount{
				Principal: principal.FromContext(ctx),
				AccountId: obj.ID.GetID(),
			},
		)

	if err != nil {
		return 0, err
	}

	return int(*result), nil
}

func (r AccountResolver) TransactionsChargebackCount(ctx context.Context, obj *types.Account) (int, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return 0, err
	}

	result, err := r.App.Queries.AccountTransactionsChargebackCount.
		Handle(
			ctx,
			query.AccountTransactionsChargebackCount{
				Principal: principal.FromContext(ctx),
				AccountId: obj.ID.GetID(),
			},
		)

	if err != nil {
		return 0, err
	}

	return int(*result), nil
}

func (r AccountResolver) Transactions(ctx context.Context, obj *types.Account, after *string, before *string, first *int, last *int, typeArg *types.AccountTransactionType, from *time.Time, to *time.Time) (*types.AccountTransactionConnection, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	cursor, err := paging.NewCursor(after, before, first, last)

	if err != nil {
		return nil, gqlerror.Errorf(err.Error())
	}

	var tp *string

	if typeArg != nil {
		v := typeArg.String()
		tp = &v
	}

	accountId := obj.ID.GetID()

	results, err := r.App.Queries.SearchAccountTransactions.
		Handle(
			ctx,
			query.SearchAccountTransactions{
				Principal: principal.FromContext(ctx),
				Cursor:    cursor,
				AccountId: &accountId,
				From:      from,
				To:        to,
				Type:      tp,
			},
		)

	if err != nil {
		return nil, err
	}

	return types.MarshalAccountTransactionToGraphQLConnection(ctx, results, cursor), nil
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
