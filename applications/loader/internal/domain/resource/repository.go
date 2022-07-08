package resource

import (
	"context"
	tusd "github.com/tus/tusd/pkg/handler"
	"os"
)

type Repository interface {
	CreateResource(ctx context.Context, resource *Resource) error
	GetAndCreateResources(ctx context.Context, upload *Upload) ([]*Resource, error)
	DeleteResources(ctx context.Context, resources []*Resource) error
	GetComposer(ctx context.Context) (*tusd.StoreComposer, error)
	DownloadResourceUpload(ctx context.Context, resource *Resource) (*os.File, error)
	DownloadResource(ctx context.Context, resource *Resource) (*os.File, error)
	DownloadVideoThumbnailForResource(ctx context.Context, resource *Resource) (*os.File, error)
	UploadProcessedResource(ctx context.Context, move []*Move, resource *Resource) error
	UpdateResourceFailed(ctx context.Context, resource *Resource) error
	UpdateResourcePrivacy(ctx context.Context, resource []*Resource, private bool) error
	GetResourcesByIds(ctx context.Context, itemIds, resourceIds []string) ([]*Resource, error)
	GetResourceById(ctx context.Context, itemId string, resourceId string) (*Resource, error)
}
