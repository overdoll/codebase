package entities

import (
	"context"

	"overdoll/applications/sting/src/app"
	"overdoll/applications/sting/src/ports/graphql/types"
)

type EntityResolver struct {
	App app.Application
}

func (e EntityResolver) FindWorkaround2ByID(ctx context.Context, id *int) (*types.Workaround2, error) {
	panic("implement me")
}
