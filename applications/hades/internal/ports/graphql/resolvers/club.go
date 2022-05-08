package resolvers

import (
	"context"
	"github.com/vektah/gqlparser/v2/gqlerror"
	"overdoll/applications/hades/internal/app"
	"overdoll/applications/hades/internal/app/query"
	"overdoll/applications/hades/internal/ports/graphql/types"
	"overdoll/libraries/graphql"
	"overdoll/libraries/paging"
	"overdoll/libraries/passport"
	"overdoll/libraries/principal"
)

type ClubResolver struct {
	App *app.Application
}

func (r ClubResolver) SupporterSubscriptionPrice(ctx context.Context, obj *types.Club) (*types.LocalizedPricingPoint, error) {

	localizedResult, allResults, err := r.App.Queries.ClubSupporterPricing.Handle(ctx, query.ClubSupporterPricing{
		Passport: passport.FromContext(ctx),
		ClubId:   obj.ID.GetID(),
	})

	if err != nil {
		return nil, err
	}

	var results []*types.Price

	for _, res := range allResults {
		results = append(results, &types.Price{
			Amount:   int(res.Amount()),
			Currency: graphql.MarshalCurrencyToGraphQL(ctx, res.Currency()),
		})
	}

	return &types.LocalizedPricingPoint{
		LocalizedPrice: &types.Price{
			Amount:   int(localizedResult.Amount()),
			Currency: graphql.MarshalCurrencyToGraphQL(ctx, localizedResult.Currency()),
		},
		Prices: results,
	}, nil
}

func (r ClubResolver) TransactionMetrics(ctx context.Context, obj *types.Club, after *string, before *string, first *int, last *int) (*types.ClubTransactionMetricConnection, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	cursor, err := paging.NewCursor(after, before, first, last)

	if err != nil {
		return nil, gqlerror.Errorf(err.Error())
	}

	results, err := r.App.Queries.ClubTransactionMetrics.Handle(ctx, query.ClubTransactionMetrics{
		Principal: principal.FromContext(ctx),
		Cursor:    cursor,
		ClubId:    obj.ID.GetID(),
	})

	if err != nil {
		return nil, err
	}

	return types.MarshalClubTransactionMetricsToGraphQLConnection(ctx, results, cursor), nil
}
