package command

import (
	"context"

	"overdoll/libraries/principal"
)

type EvaService interface {
	GetAccount(context.Context, string) (*principal.Principal, error)
}

type LoaderService interface {
	CreateOrGetResourcesFromUploads(ctx context.Context, itemId string, resourceIds []string) ([]string, error)
}
