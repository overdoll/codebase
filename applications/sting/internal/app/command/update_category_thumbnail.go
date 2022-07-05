package command

import (
	"context"
	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/principal"
)

type UpdateCategoryThumbnail struct {
	Principal  *principal.Principal
	CategoryId string
	Thumbnail  string
}

type UpdateCategoryThumbnailHandler struct {
	pr     post.Repository
	loader LoaderService
}

func NewUpdateCategoryThumbnailHandler(pr post.Repository, loader LoaderService) UpdateCategoryThumbnailHandler {
	return UpdateCategoryThumbnailHandler{pr: pr, loader: loader}
}

func (h UpdateCategoryThumbnailHandler) Handle(ctx context.Context, cmd UpdateCategoryThumbnail) (*post.Category, error) {

	cat, err := h.pr.UpdateCategoryThumbnail(ctx, cmd.Principal, cmd.CategoryId, func(category *post.Category) error {

		// create resources from content
		resourceIds, err := h.loader.CreateOrGetResourcesFromUploads(ctx, cmd.CategoryId, []string{cmd.Thumbnail}, false, "CATEGORY", true, 100, 100)

		if err != nil {
			return err
		}

		return category.UpdateThumbnail(cmd.Principal, resourceIds[0])
	})

	if err != nil {
		return nil, err
	}

	return cat, nil
}
