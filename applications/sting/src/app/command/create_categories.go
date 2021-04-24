package command

import (
	"context"

	sting "overdoll/applications/sting/proto"
	"overdoll/applications/sting/src/domain/category"
)

type CreateCategoryHandler struct {
	cr  category.Repository
	cir category.IndexRepository
}

func NewCreateCategoryHandler(cr category.Repository, cir category.IndexRepository) CreateCategoryHandler {
	return CreateCategoryHandler{cr: cr, cir: cir}
}

func (h CreateCategoryHandler) HandlerName() string {
	return "CreateCategoryHandler"
}

func (h CreateCategoryHandler) NewCommand() interface{} {
	return &sting.CategoryCreated{}
}

func (h CreateCategoryHandler) Handle(ctx context.Context, c interface{}) error {
	cmd := c.(*sting.CategoryCreated)

	categories, err := category.UnmarshalFromProtoArray(cmd.Categories)

	if err != nil {
		return err
	}

	// Create categories (from database)
	err = h.cr.CreateCategories(ctx, categories)

	if err != nil {
		return err
	}

	// Bulk index
	err = h.cir.BulkIndex(ctx, categories)

	if err != nil {
		return err
	}

	return nil
}
