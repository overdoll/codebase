package query

import (
	"context"

	"overdoll/applications/sting/internal/domain/post"
)

type CategoryById struct {
	CategoryId string
}

type CategoryByIdHandler struct {
	pr post.Repository
}

func NewCategoryByIdHandler(pr post.Repository) CategoryByIdHandler {
	return CategoryByIdHandler{pr: pr}
}

func (h CategoryByIdHandler) Handle(ctx context.Context, cmd CategoryById) (*post.Category, error) {

	result, err := h.pr.GetCategoryById(ctx, cmd.CategoryId)

	if err != nil {
		return nil, err
	}

	return result, nil
}
