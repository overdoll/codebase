package command

import (
	"context"

	"overdoll/libraries/principal"
)

type EvaService interface {
	GetAccount(ctx context.Context, accountId string) (*principal.Principal, error)
}

type ParleyService interface {
	GetNextModeratorId(ctx context.Context) (string, error)
}

type LoaderService interface {
	CreateOrGetResourcesFromUploads(ctx context.Context, itemId string, resourceIds []string) ([]string, error)
	DeleteResources(ctx context.Context, itemId string, resourceIds []string) error
	AllResourcesProcessed(ctx context.Context, itemId string, resourceIds []string) (bool, error)
}
