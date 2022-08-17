package activities

import (
	"context"
	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/resource"
)

type UpdateCategoryBannerInput struct {
	CategoryId string
	PostId     string
}

func (h *Activities) UpdateCategoryBanner(ctx context.Context, input UpdateCategoryBannerInput) error {

	var pst *post.Post
	var err error

	if input.PostId != "" {
		pst, err = h.pr.GetPostByIdOperator(ctx, input.PostId)

		if err != nil {
			return err
		}
	} else {
		pst, err = h.pr.GetFirstTopPostWithoutOccupiedResources(ctx, nil, &input.CategoryId, nil, nil)

		if err != nil {
			return err
		}
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

		newResource, err := h.loader.CopyResourceIntoImage(ctx, pst.ID(), selectedContentResource.ID(), false, "CATEGORY_BANNER", 480, 0, category.ID())

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
