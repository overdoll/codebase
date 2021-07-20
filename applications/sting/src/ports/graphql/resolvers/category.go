package resolvers

import (
	"context"

	"overdoll/applications/sting/src/app"
	"overdoll/applications/sting/src/ports/graphql/types"
	"overdoll/libraries/graphql"
)

type CategoryResolver struct {
	App *app.Application
}

func (c CategoryResolver) Thumbnail(ctx context.Context, obj *types.Media, size *int) (graphql.URI, error) {
	return "", nil
}
