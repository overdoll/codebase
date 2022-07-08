package command

import (
	"context"
	"overdoll/applications/sting/internal/domain/post"

	"overdoll/libraries/principal"
)

type AddCategoryAlternativeTitle struct {
	Principal  *principal.Principal
	CategoryId string
	Title      string
	Locale     string
}

type AddCategoryAlternativeTitleHandler struct {
	pr post.Repository
}

func NewAddCategoryAlternativeTitleHandler(pr post.Repository) AddCategoryAlternativeTitleHandler {
	return AddCategoryAlternativeTitleHandler{pr: pr}
}

func (h AddCategoryAlternativeTitleHandler) Handle(ctx context.Context, cmd AddCategoryAlternativeTitle) (*post.Category, error) {

	cat, err := h.pr.UpdateCategoryAlternativeTitles(ctx, cmd.Principal, cmd.CategoryId, func(category *post.Category) error {
		return category.AddAlternativeTitle(cmd.Principal, cmd.Title, cmd.Locale)
	})

	if err != nil {
		return nil, err
	}

	return cat, nil
}
