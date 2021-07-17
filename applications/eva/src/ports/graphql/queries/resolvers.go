package queries

import (
	"context"

	"overdoll/applications/eva/src/app"
	"overdoll/applications/eva/src/ports/graphql/types"
)

type QueryResolver struct {
	App *app.Application
}

func (r *QueryResolver) Node(ctx context.Context, id string) (types.Node, error) {
	panic("implement me 3")
}
