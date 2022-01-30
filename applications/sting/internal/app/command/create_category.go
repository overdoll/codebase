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
	pi post.IndexRepository
}

func NewCreateCategoryHandler(pr post.Repository, pi post.IndexRepository) CreateCategoryHandler {
	return CreateCategoryHandler{pr: pr, pi: pi}
}

func (h CreateCategoryHandler) Handle(ctx context.Context, cmd CreateCategory) (*post.Category, error) {

	cat, err := post.NewCategory(cmd.Principal, cmd.Slug, cmd.Title)

	if err != nil {
		return nil, err
	}

	if err := h.pr.CreateCategory(ctx, cmd.Principal, cat); err != nil {
		return nil, err
	}

	if err := h.pi.IndexCategory(ctx, cat); err != nil {
		return nil, err
	}

	return cat, nil
}
