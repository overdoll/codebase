package command

import (
	"context"
	"overdoll/applications/sting/internal/domain/post"

	"overdoll/libraries/principal"
)

type RemoveCategoryAlternativeTitle struct {
	Principal  *principal.Principal
	CategoryId string
	Title      string
}

type RemoveCategoryAlternativeTitleHandler struct {
	pr post.Repository
}

func NewRemoveCategoryAlternativeTitleHandler(pr post.Repository) RemoveCategoryAlternativeTitleHandler {
	return RemoveCategoryAlternativeTitleHandler{pr: pr}
}

func (h RemoveCategoryAlternativeTitleHandler) Handle(ctx context.Context, cmd RemoveCategoryAlternativeTitle) (*post.Category, error) {

	cat, err := h.pr.UpdateCategoryAlternativeTitles(ctx, cmd.Principal, cmd.CategoryId, func(category *post.Category) error {
		return category.RemoveAlternativeTitle(cmd.Principal, cmd.Title)
	})

	if err != nil {
		return nil, err
	}

	return cat, nil
}
