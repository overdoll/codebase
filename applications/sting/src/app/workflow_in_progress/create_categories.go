package workflow

import (
	"context"

	sting "overdoll/applications/sting/proto"
	"overdoll/applications/sting/src/domain/post"
)

type CreateCategoryHandler struct {
	pr post.Repository
	pi post.IndexRepository
}

func NewCreateCategoryHandler(pr post.Repository, pi post.IndexRepository) CreateCategoryHandler {
	return CreateCategoryHandler{pr: pr, pi: pi}
}

func (h CreateCategoryHandler) HandlerName() string {
	return "CreateCategoryHandler"
}

func (h CreateCategoryHandler) NewCommand() interface{} {
	return &sting.CategoryCreated{}
}

func (h CreateCategoryHandler) Handle(ctx context.Context, c interface{}) error {
	cmd := c.(*sting.CategoryCreated)

	categories, err := post.UnmarshalFromProtoArray(cmd.Categories)

	if err != nil {
		return err
	}

	// Create categories (from database)
	err = h.pr.CreateCategories(ctx, categories)

	if err != nil {
		return err
	}

	// Bulk index
	err = h.pi.BulkIndexCategories(ctx, categories)

	if err != nil {
		return err
	}

	return nil
}
