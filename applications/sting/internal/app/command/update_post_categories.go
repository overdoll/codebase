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
	pi post.IndexRepository
}

func NewUpdatePostCategoriesHandler(pr post.Repository, pi post.IndexRepository) UpdatePostCategoriesHandler {
	return UpdatePostCategoriesHandler{pr: pr, pi: pi}
}

func (h UpdatePostCategoriesHandler) Handle(ctx context.Context, cmd UpdatePostCategories) (*post.Post, error) {

	pendingPost, err := h.pr.UpdatePostCategories(ctx, cmd.Principal, cmd.PostId, func(post *post.Post) error {

		cats, err := h.pr.GetCategoriesByIds(ctx, cmd.Principal, cmd.CategoryIds)

		if err != nil {
			return err
		}

		return post.UpdateCategoriesRequest(cmd.Principal, cats)
	})

	if err != nil {
		return nil, err
	}

	// index the post
	if err := h.pi.IndexPost(ctx, pendingPost); err != nil {
		return nil, err
	}

	return pendingPost, nil
}
