package resolvers

import (
	"context"

	"github.com/vektah/gqlparser/v2/gqlerror"
	"overdoll/applications/sting/internal/app"
	"overdoll/applications/sting/internal/ports/graphql/types"
	"overdoll/libraries/paging"
)

type CategoryResolver struct {
	App *app.Application
}

func (r CategoryResolver) Posts(ctx context.Context, obj *types.Category, after *string, before *string, first *int, last *int) (*types.PostConnection, error) {

	cursor, err := paging.NewCursor(after, before, first, last)

	if err != nil {
		return nil, gqlerror.Errorf(err.Error())
	}

	results, err := r.App.Queries.SearchPosts.Handle(ctx, cursor, "", "", "", []string{obj.ID.GetID()}, nil, nil)

	if err != nil {
		return nil, err
	}

	return types.MarshalPostToGraphQLConnection(results, cursor), nil
}
