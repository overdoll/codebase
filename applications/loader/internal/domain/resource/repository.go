package resource

import (
	"context"
	"go.opencensus.io/resource"

	tusd "github.com/tus/tusd/pkg/handler"
)

type FileRepository interface {
	DeleteResources(ctx context.Context, resources []*Resource) error
	GetComposer(ctx context.Context) (*tusd.StoreComposer, error)
	UploadProcessedResources(ctx context.Context, prefix string, resources []*resource.Resource) error
}

type Repository interface {
	GetResourcesByIds(ctx context.Context, itemId string, resourceIds []string) ([]*Resource, error)
	GetResourceById(ctx context.Context, itemId string, resourceId string) (*Resource, error)
	CreateResources(ctx context.Context, res []*resource.Resource)
}
