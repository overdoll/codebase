package entities

import (
	"context"

	"overdoll/applications/parley/src/app"
	"overdoll/applications/parley/src/ports/graphql/types"
)

type EntityResolver struct {
	App *app.Application
}

func (e *EntityResolver) FindWorkaround3ByID(ctx context.Context, id *int) (*types.Workaround3, error) {
	panic("implement me")
}
