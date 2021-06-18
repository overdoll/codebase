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

	if err := h.pi.DeleteCategoryIndex(ctx); err != nil {
		return err
	}

	categories, err := h.pr.GetCategories(ctx)

	if err != nil {
		return err
	}

	return h.pi.BulkIndexCategories(ctx, categories)
}
