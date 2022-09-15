package progress

import (
	"context"
	"overdoll/libraries/media"
)

type Repository interface {
	GetProgressForMedia(ctx context.Context, linkedIds, mediaIds []string) ([]*Progress, error)
	UpdateMediaProgress(ctx context.Context, media *media.Media, prog float64) error
}
