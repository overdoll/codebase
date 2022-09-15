package media_storage

import (
	"context"
	"overdoll/libraries/media"
)

type Repository interface {
	GetMediaByLink(ctx context.Context, link *media.Link) ([]*media.Media, error)
	StoreMedia(ctx context.Context, m *media.Media) error
}
