package resolvers

import (
	"context"
	"github.com/vektah/gqlparser/v2/gqlerror"
	"overdoll/applications/parley/internal/app"
	"overdoll/applications/parley/internal/app/query"
	"overdoll/applications/parley/internal/ports/graphql/types"
	"overdoll/libraries/paging"
	"overdoll/libraries/passport"
	"overdoll/libraries/principal"
)

type ClubResolver struct {
	App *app.Application
}

func (c ClubResolver) InfractionHistory(ctx context.Context, obj *types.Club, after *string, before *string, first *int, last *int) (*types.ClubInfractionHistoryConnection, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	cursor, err := paging.NewCursor(after, before, first, last)

	if err != nil {
		return nil, gqlerror.Errorf(err.Error())
	}

	history, err := c.App.Queries.ClubInfractionHistory.Handle(ctx, query.ClubInfractionHistory{
		Cursor:    cursor,
		ClubId:    obj.ID.GetID(),
		Principal: principal.FromContext(ctx),
	})

	if err != nil {
		return nil, err
	}

	return types.MarshalClubInfractionHistoryToGraphQLConnection(ctx, history, cursor), nil
}
