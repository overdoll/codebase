package activities

import (
	"context"
	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/media"
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
		pst, err = h.pr.GetFirstTopPostWithoutOccupiedMedias(ctx, nil, &input.CategoryId, nil, nil)

		if err != nil {
			return err
		}
	}

	if pst == nil {
		return nil
	}

	var selectedContentResource *media.Media

	for _, cnt := range pst.Content() {
		if !cnt.IsSupporterOnly() {
			selectedContentResource = cnt.Media()
			break
		}
	}

	if selectedContentResource == nil {
		return nil
	}

	_, err = h.pr.UpdateCategoryBannerOperator(ctx, input.CategoryId, func(category *post.Category) error {

		newResource, err := h.loader.GenerateImageFromMedia(ctx, []*media.Media{selectedContentResource}, media.NewCategoryBannerMediaLink(input.CategoryId), nil)

		if err != nil {
			return err
		}

		return category.UpdateBanner(newResource[0])
	})

	if err != nil {
		return err
	}

	return h.pr.AddPostOccupiedMedia(ctx, pst, selectedContentResource)
}
