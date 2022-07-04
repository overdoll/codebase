package command

import (
	"context"
	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/principal"
	"overdoll/libraries/resource"
)

type EvaService interface {
	GetAccount(ctx context.Context, accountId string) (*principal.Principal, error)
}

type LoaderService interface {
	CopyResourceIntoImage(ctx context.Context, itemId string, resourceId string, private bool, token string, width uint64, height uint64) (*post.NewResource, error)
	CopyResourcesAndApplyPixelateFilter(ctx context.Context, itemId string, resourceIds []string, pixelate int, private bool, token string) ([]*post.NewResource, error)
	CreateOrGetResourcesFromUploads(ctx context.Context, itemId string, resourceIds []string, private bool, token string, onlyImages bool, width uint64, height uint64) ([]*resource.Resource, error)
	DeleteResources(ctx context.Context, itemId string, resourceIds []string) error
}
