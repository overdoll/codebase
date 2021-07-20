package query

import (
	"context"
	"errors"

	"go.uber.org/zap"
	"overdoll/applications/sting/src/domain/post"
)

var (
	errFailedCategoryById = errors.New("category by id failed")
)

type CategoryByIdHandler struct {
	pr post.Repository
}

func NewCategoryByIdHandler(pr post.Repository) CategoryByIdHandler {
	return CategoryByIdHandler{pr: pr}
}

func (h CategoryByIdHandler) Handle(ctx context.Context, categoryId string) (*post.Category, error) {

	result, err := h.pr.GetCategoryById(ctx, categoryId)

	if err != nil {
		zap.S().Errorf("failed to get category: %s", err)
		return nil, errFailedCategoryById
	}

	return result, nil
}
