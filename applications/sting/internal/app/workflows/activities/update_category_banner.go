package activities

import (
	"context"
	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/resource"
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

	var selectedContentResource *resource.Resource

	for _, cnt := range pst.Content() {
		if !cnt.IsSupporterOnly() {
			selectedContentResource = cnt.Resource()
			break
		}
	}

	if selectedContentResource == nil {
		return nil
	}

	_, err = h.pr.UpdateCategoryBannerOperator(ctx, input.CategoryId, func(category *post.Category) error {

		newResource, err := h.loader.CopyResourceIntoImage(ctx, pst.ID(), selectedContentResource.ID(), false, "CATEGORY_BANNER", 360, 640, category.ID())

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
