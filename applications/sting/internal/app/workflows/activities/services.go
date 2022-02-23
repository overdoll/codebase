package activities

import (
	"context"
	"overdoll/applications/sting/internal/domain/post"
)

type ParleyService interface {
	GetNextModeratorId(context.Context) (string, error)
}

type StellaService interface {
	CanAccountCreatePostUnderClub(context.Context, string, string) (bool, error)
}

type LoaderService interface {
	CreateOrGetResourcesFromUploads(context.Context, string, []string, bool) ([]string, error)
	DeleteResources(context.Context, string, []string) error
	CopyResourcesAndApplyPixelateFilter(ctx context.Context, itemId string, resourceIds []string, pixelate int, private bool) ([]*post.NewContent, error)
}
