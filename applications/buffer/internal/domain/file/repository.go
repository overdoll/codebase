package file

import (
	"context"

	tusd "github.com/tus/tusd/pkg/handler"
)

type Repository interface {
	GetComposer(ctx context.Context) (*tusd.StoreComposer, error)
}
