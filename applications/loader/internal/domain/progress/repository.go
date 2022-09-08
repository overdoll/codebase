package progress

import (
	"context"
)

type Repository interface {
	GetProgressForMedia(ctx context.Context, linkedIds, mediaIds []string) ([]*Progress, error)
	UpdateMediaProgress(ctx context.Context, linkedId, mediaId string, prog float64) error
}
