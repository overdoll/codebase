package event

import (
	"context"
	"overdoll/applications/loader/internal/domain/resource"
)

type Repository interface {
	ProcessResources(ctx context.Context, itemId string, resourceIds []string, source string, config *resource.Config) error
	DeleteResources(ctx context.Context, itemId string, resourceIds []string) error
}
