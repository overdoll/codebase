package command

import (
	"context"
	"overdoll/applications/sting/internal/domain/post"

	"overdoll/libraries/principal"
)

type UpdateCategoryTitle struct {
	Principal  *principal.Principal
	CategoryId string
	Title      string
	Locale     string
}

type UpdateCategoryTitleHandler struct {
	pr post.Repository
	pi post.IndexRepository
}

func NewUpdateCategoryTitleHandler(pr post.Repository, pi post.IndexRepository) UpdateCategoryTitleHandler {
	return UpdateCategoryTitleHandler{pr: pr, pi: pi}
}

func (h UpdateCategoryTitleHandler) Handle(ctx context.Context, cmd UpdateCategoryTitle) (*post.Category, error) {

	cat, err := h.pr.UpdateCategoryTitle(ctx, cmd.Principal, cmd.CategoryId, func(category *post.Category) error {
		return category.UpdateTitle(cmd.Principal, cmd.Title, cmd.Locale)
	})

	if err != nil {
		return nil, err
	}

	if err := h.pi.IndexCategory(ctx, cat); err != nil {
		return nil, err
	}

	return cat, nil
}
