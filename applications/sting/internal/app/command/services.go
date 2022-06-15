package command

import (
	"context"
	"overdoll/applications/sting/internal/domain/club"
	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/principal"
	"overdoll/libraries/resource"
)

type EvaService interface {
	GetAccount(ctx context.Context, accountId string) (*principal.Principal, error)
}

type LoaderService interface {
	CopyResourcesAndApplyPixelateFilter(ctx context.Context, itemId string, resourceIds []string, pixelate int, private bool) ([]*post.NewContent, error)
	CreateOrGetResourcesFromUploads(ctx context.Context, itemId string, resourceIds []string, private bool, token string) ([]*resource.Resource, error)
	DeleteResources(ctx context.Context, itemId string, resourceIds []string) error
}

type StellaService interface {
	GetClubById(ctx context.Context, clubId string) (*club.Club, error)
}
