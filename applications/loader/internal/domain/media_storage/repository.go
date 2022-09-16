package media_storage

import (
	"context"
	"overdoll/libraries/media"
)

type Repository interface {
	GetLegacyResourcesByItemId(ctx context.Context, itemId string) ([]*LegacyResource, error)
	GetSingleMediaByLinkAndId(ctx context.Context, link *media.Link, id string) (*media.Media, error)
	GetMediaByLink(ctx context.Context, link *media.Link) ([]*media.Media, error)
	StoreMedia(ctx context.Context, m *media.Media) error
}
