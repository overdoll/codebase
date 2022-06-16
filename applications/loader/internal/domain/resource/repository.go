package resource

import (
	"context"
	tusd "github.com/tus/tusd/pkg/handler"
	"os"
)

type Repository interface {
	GetAndCreateResources(ctx context.Context, itemId string, uploads []string, isPrivate bool, token string) ([]*Resource, error)
	DeleteResources(ctx context.Context, resources []*Resource) error
	GetComposer(ctx context.Context) (*tusd.StoreComposer, error)
	DownloadResource(ctx context.Context, resource *Resource) (*os.File, error)
	DownloadVideoThumbnailForResource(ctx context.Context, resource *Resource) (*os.File, error)
	UploadProcessedResource(ctx context.Context, move []*Move, resource *Resource) error
	UploadAndCreateResource(ctx context.Context, file *os.File, target *Resource) error

	GetResourcesByIds(ctx context.Context, itemIds, resourceIds []string) ([]*Resource, error)
	GetResourceById(ctx context.Context, itemId string, resourceId string) (*Resource, error)
}
