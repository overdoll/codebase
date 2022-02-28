package event

import (
	"context"
)

type Repository interface {
	ProcessResources(ctx context.Context, itemId string, resourceIds []string) error
	DeleteResources(ctx context.Context, itemId string, resourceIds []string) error
}