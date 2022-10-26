package queries

import (
	"context"
	"github.com/vektah/gqlparser/v2/gqlerror"
	"overdoll/applications/sting/internal/app/query"
	"overdoll/applications/sting/internal/ports/graphql/types"
	"overdoll/libraries/paging"
)

func (r *QueryResolver) Tags(ctx context.Context, after *string, before *string, first *int, last *int) (*types.TagConnection, error) {

	cursor, err := paging.NewCursor(after, before, first, last)

	if err != nil {
		return nil, gqlerror.Errorf(err.Error())
	}

	results, err := r.App.Queries.Tags.Handle(ctx, query.Tags{
		Cursor: cursor,
	})

	if err != nil {
		return nil, err
	}

	return types.MarshalTagToGraphQLConnection(ctx, results, cursor), nil
}
