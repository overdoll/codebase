package queries

import (
	"context"

	"github.com/vektah/gqlparser/v2/gqlerror"
	"overdoll/applications/parley/internal/app"
	"overdoll/applications/parley/internal/app/query"
	"overdoll/applications/parley/internal/ports/graphql/types"
	"overdoll/libraries/paging"
	"overdoll/libraries/passport"
)

type QueryResolver struct {
	App *app.Application
}

func (r QueryResolver) PostRejectionReasons(ctx context.Context, after *string, before *string, first *int, last *int) (*types.PostRejectionReasonConnection, error) {

	cursor, err := paging.NewCursor(after, before, first, last)

	if err != nil {
		return nil, gqlerror.Errorf(err.Error())
	}

	results, err := r.App.Queries.PostRejectionReasons.Handle(ctx, query.PostsRejectionReasons{
		AccountId: passport.FromContext(ctx).AccountID(),
		Cursor:    cursor,
	})

	if err != nil {
		return nil, err
	}

	return types.MarshalPostRejectionReasonToGraphQLConnection(results, cursor), nil
}
