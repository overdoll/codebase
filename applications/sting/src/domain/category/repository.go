package category

import (
	"context"

	"overdoll/libraries/ksuid"
)

type Repository interface {
	GetCategoriesById(context.Context, []ksuid.UUID) ([]*Category, error)
	GetCategories(ctx context.Context) ([]*Category, error)
	CreateCategories(ctx context.Context, categories []*Category) error
}

type IndexRepository interface {
	BulkIndex(ctx context.Context, categories []*Category) error
	DeleteIndex(ctx context.Context) error
}

type EventRepository interface {
	CategoriesCreated(ctx context.Context, cats []*Category) error
}
