package resource

import (
	"context"
	tusd "github.com/tus/tusd/pkg/handler"
	"os"
	"overdoll/libraries/media"
	"overdoll/libraries/media/proto"
)

type Repository interface {
	GetComposer(ctx context.Context) (*tusd.StoreComposer, error)
	DownloadUpload(ctx context.Context, media *media.Media) (*os.File, error)
	GetUploadAsMedia(ctx context.Context, link *proto.MediaLink, uploadId string) (*media.Media, error)
}
