package command

import (
	"context"

	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/principal"
)

type UpdatePostCategories struct {
	Principal *principal.Principal

	PostId      string
	CategoryIds []string
}

type UpdatePostCategoriesHandler struct {
	pr post.Repository
}

func NewUpdatePostCategoriesHandler(pr post.Repository) UpdatePostCategoriesHandler {
	return UpdatePostCategoriesHandler{pr: pr}
}

func (h UpdatePostCategoriesHandler) Handle(ctx context.Context, cmd UpdatePostCategories) (*post.Post, error) {

	pendingPost, err := h.pr.UpdatePostCategories(ctx, cmd.Principal, cmd.PostId, func(post *post.Post) error {

		cats, err := h.pr.GetCategoriesByIds(ctx, cmd.CategoryIds)

		if err != nil {
			return err
		}

		return post.UpdateCategoriesRequest(cmd.Principal, cats)
	})

	if err != nil {
		return nil, err
	}

	return pendingPost, nil
}
