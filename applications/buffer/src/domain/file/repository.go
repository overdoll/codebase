package file

import (
	"context"
	"io"

	tusd "github.com/tus/tusd/pkg/handler"
)

type Repository interface {
	GetFile(context.Context, string) (io.ReadCloser, error)
	GetComposer(ctx context.Context) (*tusd.StoreComposer, error)
}
