package event

import (
	"context"
	"overdoll/applications/loader/internal/domain/resource"
)

type Repository interface {
	ProcessResourcesWithFiltersFromCopy(ctx context.Context, itemId string, resourceIds []string, source string, config *resource.Config, filters *resource.ImageFilters) error
	ProcessResources(ctx context.Context, itemId string, resourceIds []string, source string, config *resource.Config) error
	DeleteResources(ctx context.Context, itemId string, resourceIds []string) error
	SendProcessResourcesProgress(ctx context.Context, itemId, resourceId string, progress float64) error
	GetResourceProgress(ctx context.Context, itemId, resourceIds string) (*resource.Progress, error)
}
