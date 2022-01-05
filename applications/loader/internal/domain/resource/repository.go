package resource

import (
	"context"
	tusd "github.com/tus/tusd/pkg/handler"
)

type FileRepository interface {
	GetResources(ctx context.Context, itemId string, uploads []string) ([]*Resource, error)
	DeleteResources(ctx context.Context, resources []*Resource) error
	GetComposer(ctx context.Context) (*tusd.StoreComposer, error)
	UploadProcessedResources(ctx context.Context, resources []*Resource) error
}

type Repository interface {
	GetResourcesByIds(ctx context.Context, itemId string, resourceIds []string) ([]*Resource, error)
	GetResourceById(ctx context.Context, itemId string, resourceId string) (*Resource, error)
	CreateResources(ctx context.Context, res []*Resource) error
	UpdateResources(ctx context.Context, res []*Resource) error
	DeleteResources(ctx context.Context, res []*Resource) error
}
