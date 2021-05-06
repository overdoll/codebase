package command

import (
	"context"

	"overdoll/applications/sting/src/domain/post"
)

type IndexAllCategoriesHandler struct {
	pr post.Repository
	pi post.IndexRepository
}

func NewIndexAllCategoriesHandler(pr post.Repository, pi post.IndexRepository) IndexAllCategoriesHandler {
	return IndexAllCategoriesHandler{pr: pr, pi: pi}
}

func (h IndexAllCategoriesHandler) Handle(ctx context.Context) error {
	err := h.pi.DeleteCategoryIndex(ctx)

	if err != nil {

	}

	categories, err := h.pr.GetCategories(ctx)

	if err != nil {

	}

	err = h.pi.BulkIndexCategories(ctx, categories)

	if err != nil {

	}

	return nil
}
