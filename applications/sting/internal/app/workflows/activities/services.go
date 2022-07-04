package activities

import (
	"context"
	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/resource"
	"time"
)

type ParleyService interface {
	PutPostIntoModeratorQueueOrPublish(context.Context, string) (bool, error)
}

type LoaderService interface {
	CreateOrGetResourcesFromUploads(context.Context, string, []string, bool, string, bool) ([]*resource.Resource, error)
	DeleteResources(context.Context, string, []string) error
	CopyResourceIntoImage(ctx context.Context, itemId string, resourceId string, private bool, token string, width, height uint64) (*post.NewResource, error)
	CopyResourcesAndApplyPixelateFilter(ctx context.Context, itemId string, resourceIds []string, pixelate int, private bool, token string) ([]*post.NewResource, error)
}

type CarrierService interface {
	ClubSupporterRequiredPostReminder(ctx context.Context, clubId string, duration time.Duration) error
	ClubSupporterNoPosts(ctx context.Context, clubId string) error
	ClubSuspended(ctx context.Context, clubId string, endTime time.Time) error
}
