package category

import (
	"context"

	"overdoll/libraries/ksuid"
)

type Repository interface {
	GetCategoryById(context.Context, ksuid.UUID) (*Category, error)
	GetCategories(context.Context, []ksuid.UUID) ([]*Category, error)
	CreateCategory(context.Context, *Category) error
	CreateCategories(context.Context, []*Category) error
}
