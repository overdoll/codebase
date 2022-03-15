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

type AccountInactiveClubSupporterSubscriptionResolver struct {
	App *app.Application
}

func (r AccountInactiveClubSupporterSubscriptionResolver) Transactions(ctx context.Context, obj *types.AccountInactiveClubSupporterSubscription, after *string, before *string, first *int, last *int, typeArg *types.AccountTransactionType, from *time.Time, to *time.Time) (*types.AccountTransactionConnection, error) {

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

	results, err := r.App.Queries.SearchAccountTransactionHistory.
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

func (r AccountInactiveClubSupporterSubscriptionResolver) CancellationReason(ctx context.Context, obj *types.AccountInactiveClubSupporterSubscription) (*types.CancellationReason, error) {

	if obj.CancellationReason == nil {
		return nil, nil
	}

	result, err := r.App.Queries.CancellationReasonById.Handle(ctx, query.CancellationReasonById{
		ReasonId: obj.CancellationReason.ID.GetID(),
	})

	if err != nil {
		return nil, err
	}

	return types.MarshalCancellationReasonToGraphQL(ctx, result), nil
}
