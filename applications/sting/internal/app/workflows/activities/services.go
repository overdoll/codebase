package activities

import (
	"context"
	"overdoll/applications/sting/internal/domain/post"
	"overdoll/applications/sting/internal/domain/resource_options"
	"overdoll/libraries/resource"
	"time"
)

type ParleyService interface {
	PutPostIntoModeratorQueueOrPublish(context.Context, string) (bool, error)
}

type LoaderService interface {
	CreateOrGetResourcesFromUploads(ctx context.Context, itemId string, resourceIds []string, private bool, token string, onlyImages bool, width uint64, height uint64) ([]*resource.Resource, error)
	DeleteResources(context.Context, string, []string) error
	CopyResourceIntoImage(ctx context.Context, options *resource_options.ResourceOptions) (*post.NewResource, error)
	CopyResourcesAndApplyPixelateFilter(ctx context.Context, itemId string, resourceIds []string, pixelate int, private bool, token string) ([]*post.NewResource, error)
}

type CarrierService interface {
	ClubSupporterRequiredPostReminder(ctx context.Context, clubId string, duration time.Duration) error
	ClubSupporterNoPosts(ctx context.Context, clubId string) error
	ClubSuspended(ctx context.Context, clubId string, endTime time.Time) error
	PostFailedProcessing(ctx context.Context, postId string) error
}
