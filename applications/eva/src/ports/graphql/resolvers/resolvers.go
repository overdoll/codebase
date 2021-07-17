package resolvers

import (
	"context"

	"overdoll/applications/eva/src/app"
	"overdoll/applications/eva/src/ports/graphql/types"
)

type TestResolver struct {
	App *app.Application
}

func (t TestResolver) Test(ctx context.Context, obj *types.Test) (string, error) {
	return "asdasdddasd", nil
}
