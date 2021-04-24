package command

import (
	"context"

	"overdoll/applications/sting/src/domain/category"
)

type IndexAllCategoriesHandler struct {
	cr  category.Repository
	cir category.IndexRepository
}

func NewIndexAllCategoriesHandler(cr category.Repository, cir category.IndexRepository) IndexAllCategoriesHandler {
	return IndexAllCategoriesHandler{cr: cr, cir: cir}
}

func (h IndexAllCategoriesHandler) Handle(ctx context.Context) error {
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
