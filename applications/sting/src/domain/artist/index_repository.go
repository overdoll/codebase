package artist

import (
	"context"
)

type IndexRepository interface {
	DeleteIndex(ctx context.Context) error
	BulkIndex(ctx context.Context, artists []*Artist) error
}
