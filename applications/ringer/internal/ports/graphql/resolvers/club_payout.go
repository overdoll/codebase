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

type ClubPayoutResolver struct {
	App *app.Application
}

func (r ClubPayoutResolver) Payments(ctx context.Context, obj *types.ClubPayout, after *string, before *string, first *int, last *int, status []types.ClubPaymentStatus) (*types.ClubPaymentConnection, error) {

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

	pid := obj.ID.GetID()

	result, err := r.App.Queries.SearchClubPayments.Handle(ctx, query.SearchClubPayments{
		Principal: principal.FromContext(ctx),
		Cursor:    cursor,
		Status:    statuses,
		PayoutId:  &pid,
	})

	if err != nil {
		return nil, err
	}

	return types.MarshalClubPaymentsToGraphQLConnection(ctx, result, cursor), nil
}
