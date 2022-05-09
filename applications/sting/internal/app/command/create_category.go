package command

import (
	"context"
	"overdoll/applications/sting/internal/domain/post"

	"overdoll/libraries/principal"
)

type CreateCategory struct {
	Principal *principal.Principal
	Slug      string
	Title     string
}

type CreateCategoryHandler struct {
	pr post.Repository
}

func NewCreateCategoryHandler(pr post.Repository) CreateCategoryHandler {
	return CreateCategoryHandler{pr: pr}
}

func (h CreateCategoryHandler) Handle(ctx context.Context, cmd CreateCategory) (*post.Category, error) {

	cat, err := post.NewCategory(cmd.Principal, cmd.Slug, cmd.Title)

	if err != nil {
		return nil, err
	}

	if err := h.pr.CreateCategory(ctx, cmd.Principal, cat); err != nil {
		return nil, err
	}

	return cat, nil
}
