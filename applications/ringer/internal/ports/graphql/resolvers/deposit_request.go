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

type DepositRequestResolver struct {
	App *app.Application
}

func (r DepositRequestResolver) Payouts(ctx context.Context, obj *types.DepositRequest, after *string, before *string, first *int, last *int, status []types.ClubPayoutStatus) (*types.ClubPayoutConnection, error) {

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

	did := obj.ID.GetID()

	result, err := r.App.Queries.SearchClubPayouts.Handle(ctx, query.SearchClubPayouts{
		Principal:        principal.FromContext(ctx),
		Cursor:           cursor,
		Status:           statuses,
		DepositRequestId: &did,
	})

	if err != nil {
		return nil, err
	}

	return types.MarshalClubPayoutsToGraphQLConnection(ctx, result, cursor), nil
}
