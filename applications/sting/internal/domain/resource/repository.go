package resource

import (
	"context"

	tusd "github.com/tus/tusd/pkg/handler"
)

type Repository interface {
	GetResourcesByIds(ctx context.Context, itemId string, resourceIds []string) ([]*Resource, error)
	GetResourceById(ctx context.Context, itemId string, resourceId string) (*Resource, error)

	CreateOrGetResourcesFromUploads(ctx context.Context, itemId string, uploadIds []string) ([]*Resource, error)

	ProcessResourcesFromIds(ctx context.Context, prefix string, itemId string, resourceIds []string) error

	DeleteResources(ctx context.Context, resources []*Resource) error

	GetComposer(ctx context.Context) (*tusd.StoreComposer, error)
}
