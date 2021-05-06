package workflow

import (
	"context"

	sting "overdoll/applications/sting/proto"
	"overdoll/applications/sting/src/domain/post"
)

type IndexAllCategoriesHandler struct {
	pr post.Repository
	pi post.IndexRepository
}

func NewIndexAllCategoriesHandler(pr post.Repository, pi post.IndexRepository) IndexAllCategoriesHandler {
	return IndexAllCategoriesHandler{pr: pr, pi: pi}
}

func (h IndexAllCategoriesHandler) HandlerName() string {
	return "IndexAllCategoriesHandler"
}

func (h IndexAllCategoriesHandler) NewCommand() interface{} {
	return &sting.IndexAllCategories{}
}

func (h IndexAllCategoriesHandler) Handle(ctx context.Context, c interface{}) error {
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
