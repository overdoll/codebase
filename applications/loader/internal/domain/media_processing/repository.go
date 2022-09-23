package media_processing

import (
	"context"
	"os"
	"overdoll/libraries/media"
)

type Repository interface {
	UploadMedia(ctx context.Context, move []*Move, target *media.Media) error
	DownloadImageMedia(ctx context.Context, target *media.Media) (*os.File, error)
}
