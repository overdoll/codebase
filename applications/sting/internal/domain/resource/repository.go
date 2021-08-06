package resource

import (
	"context"

	tusd "github.com/tus/tusd/pkg/handler"
)

type Repository interface {
	// process a list of resources
	// prefix can be added
	ProcessResources(ctx context.Context, prefix string, resources []*Resource) error

	// create resources
	CreateResources(ctx context.Context, uploads []string) ([]*Resource, error)

	// delete resources that were processed
	DeleteProcessedResources(ctx context.Context, resources []*Resource) error

	GetComposer(ctx context.Context) (*tusd.StoreComposer, error)
}
