package entities

import (
	"context"

	"overdoll/applications/eva/src/app"
	"overdoll/applications/eva/src/ports/graphql/types"
)

type EntityResolver struct {
	App app.Application
}

func (e EntityResolver) FindWorkaround1ByID(ctx context.Context, id *int) (*types.Workaround1, error) {
	panic("implement me")
}
