package resolvers

import (
	"context"
	"overdoll/applications/sting/internal/app"
	"overdoll/applications/sting/internal/ports/graphql/dataloader"
	"overdoll/applications/sting/internal/ports/graphql/types"
)

type CategoryCurationProfileResolver struct {
	App *app.Application
}

func (c CategoryCurationProfileResolver) Categories(ctx context.Context, obj *types.CategoryCurationProfile) ([]*types.Category, error) {

	var categories []*types.Category

	for _, c := range obj.Categories {
		cat, err := dataloader.For(ctx).GetCategoryById(ctx, c.ID.GetID())

		if err != nil {
			return nil, err
		}

		categories = append(categories, cat)
	}

	return categories, nil
}
