package upload

import (
	"context"
	tusd "github.com/tus/tusd/pkg/handler"
	"os"
)

type Repository interface {
	GetComposer(ctx context.Context) (*tusd.StoreComposer, error)
	DownloadUpload(ctx context.Context, uploadId string) (*os.File, error)
	GetUpload(ctx context.Context, uploadId string) (*Upload, error)
}
