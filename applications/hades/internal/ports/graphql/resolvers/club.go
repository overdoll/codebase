package resolvers

import (
	"context"
	"overdoll/applications/hades/internal/app"
	"overdoll/applications/hades/internal/app/query"
	"overdoll/applications/hades/internal/ports/graphql/types"
	"overdoll/libraries/passport"
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
			Amount:   res.Amount(),
			Currency: types.MarshalCurrencyToGraphQL(ctx, res.Currency()),
		})
	}

	return &types.LocalizedPricingPoint{
		LocalizedPrice: &types.Price{
			Amount:   localizedResult.Amount(),
			Currency: types.MarshalCurrencyToGraphQL(ctx, localizedResult.Currency()),
		},
		Prices: results,
	}, nil
}
