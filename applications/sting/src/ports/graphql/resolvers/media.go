package resolvers

import (
	"context"

	"github.com/vektah/gqlparser/v2/gqlerror"
	"overdoll/applications/sting/src/app"
	"overdoll/applications/sting/src/ports/graphql/types"
	"overdoll/libraries/paging"
)

type MediaResolver struct {
	App *app.Application
}

func (r MediaResolver) Posts(ctx context.Context, obj *types.Media, after *string, before *string, first *int, last *int) (*types.PostConnection, error) {

	cursor, err := paging.NewCursor(after, before, first, last)

	if err != nil {
		return nil, gqlerror.Errorf(err.Error())
	}

	results, page, err := r.App.Queries.SearchPosts.Handle(ctx, cursor, "", "", "", nil, nil, []string{obj.ID.GetID()})

	if err != nil {
		return nil, err
	}

	return types.MarshalPostToGraphQLConnection(results, page), nil
}
