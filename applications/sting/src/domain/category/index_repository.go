package category

import (
	"context"
)

type IndexRepository interface {
	BulkIndex(ctx context.Context, categories []*Category) error
	DeleteIndex(ctx context.Context) error
}
