package entities

import (
	"context"

	"overdoll/applications/sting/src/app"
	"overdoll/applications/sting/src/ports/graphql/types"
)

type EntityResolver struct {
	App *app.Application
}

func (e EntityResolver) FindViewerByID(ctx context.Context, id string) (*types.Viewer, error) {
	panic("implement me")
}
