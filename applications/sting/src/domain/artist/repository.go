package artist

import (
	"context"
)

type Repository interface {
	GetArtists(ctx context.Context) ([]*Artist, error)
}
