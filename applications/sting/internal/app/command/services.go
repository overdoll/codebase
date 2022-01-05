package command

import (
	"context"

	"overdoll/libraries/principal"
)

type EvaService interface {
	GetAccount(context.Context, string) (*principal.Principal, error)
}

type ParleyService interface {
	GetNextModeratorId(context.Context) (string, error)
}

type StellaService interface {
	GetClub(context.Context, string) (bool, error)
}

type LoaderService interface {
	CreateOrGetResourcesFromUploads(context.Context, string, []string) ([]string, error)
	DeleteResources(context.Context, string, []string) error
}
