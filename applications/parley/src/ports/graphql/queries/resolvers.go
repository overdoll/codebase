package queries

import (
	"context"

	"github.com/vektah/gqlparser/v2/gqlerror"
	"overdoll/applications/parley/src/app"
	"overdoll/applications/parley/src/ports/graphql/types"
	"overdoll/libraries/paging"
	"overdoll/libraries/passport"
)

type QueryResolver struct {
	App *app.Application
}

func (r QueryResolver) PendingPostRejectionReasons(ctx context.Context, after *string, before *string, first *int, last *int) (*types.PendingPostRejectionReasonConnection, error) {

	cursor, err := paging.NewCursor(after, before, first, last)

	if err != nil {
		return nil, gqlerror.Errorf(err.Error())
	}

	results, page, err := r.App.Queries.PendingPostRejectionReasons.Handle(ctx, cursor, passport.FromContext(ctx).AccountID())

	if err != nil {
		return nil, err
	}

	return types.MarshalPendingPostRejectionReasonToGraphQLConnection(results, page), nil
}
