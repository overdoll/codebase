package activities

import (
	"context"
	"overdoll/applications/sting/internal/domain/post"
)

type UpdateCategoryBannerInput struct {
	CategoryId string
}

func (h *Activities) UpdateCategoryBanner(ctx context.Context, input UpdateCategoryBannerInput) error {

	pst, err := h.pr.GetFirstTopPostWithoutOccupiedResources(ctx, nil, &input.CategoryId, nil, nil)

	if err != nil {
		return err
	}

	if pst == nil {
		return nil
	}

	selectedContentResource := pst.Content()[0].Resource()

	_, err = h.pr.UpdateCategoryBannerOperator(ctx, input.CategoryId, func(category *post.Category) error {

		newResource, err := h.loader.CopyResourceIntoImage(ctx, pst.ID(), selectedContentResource.ID(), false)

		if err != nil {
			return err
		}

		return category.UpdateBanner(newResource.NewResource())
	})

	if err != nil {
		return err
	}

	return h.pr.AddPostOccupiedResource(ctx, pst, selectedContentResource)
}
