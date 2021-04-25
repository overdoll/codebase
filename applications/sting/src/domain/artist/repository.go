package artist

import (
	"context"
)

type Repository interface {
	GetArtists(ctx context.Context) ([]*Artist, error)
}

type IndexRepository interface {
	DeleteIndex(ctx context.Context) error
	BulkIndex(ctx context.Context, artists []*Artist) error
}
