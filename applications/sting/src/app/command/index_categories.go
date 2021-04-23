package command

import (
	"context"

	"overdoll/applications/sting/src/domain/category"
)

type IndexCategoriesHandler struct {
	cr  category.Repository
	cir category.IndexRepository
}

func NewIndexCategoriesHandler(cr category.Repository, cir category.IndexRepository) IndexCategoriesHandler {
	return IndexCategoriesHandler{cr: cr, cir: cir}
}

func (h IndexCategoriesHandler) Handle(ctx context.Context) error {
	err := h.cir.DeleteIndex(ctx)

	if err != nil {

	}

	categories, err := h.cr.GetCategories(ctx)

	if err != nil {

	}

	err = h.cir.BulkIndex(ctx, categories)

	if err != nil {

	}

	return nil
}
