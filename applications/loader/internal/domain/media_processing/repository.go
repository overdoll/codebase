package media_processing

import (
	"context"
	"overdoll/libraries/media"
)

type Repository interface {
	UploadMedia(ctx context.Context, move []*Move, target *media.Media) error
}
