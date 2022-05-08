package activities

import (
	"context"
	"overdoll/applications/sting/internal/domain/post"
)

type ParleyService interface {
	PutPostIntoModeratorQueueOrPublish(context.Context, string) (bool, error)
}

type StellaService interface {
	NewSupporterPost(ctx context.Context, clubId string) error
}

type LoaderService interface {
	CreateOrGetResourcesFromUploads(context.Context, string, []string, bool) ([]string, error)
	DeleteResources(context.Context, string, []string) error
	CopyResourcesAndApplyPixelateFilter(ctx context.Context, itemId string, resourceIds []string, pixelate int, private bool) ([]*post.NewContent, error)
}
