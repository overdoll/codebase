package command

import (
	"context"
	"overdoll/libraries/media"
	"overdoll/libraries/principal"
)

type EvaService interface {
	GetAccount(ctx context.Context, accountId string) (*principal.Principal, error)
}

type LoaderService interface {
	ProcessMediaFromUploads(ctx context.Context, uploadIds []string, link *media.Link) ([]*media.Media, error)
	GenerateImageFromMedia(ctx context.Context, sources []*media.Media, link *media.Link, pixelate *int64) ([]*media.Media, error)
	CancelMediaProcessing(ctx context.Context, media []*media.Media) error
	ConvertResourcesToMedia(ctx context.Context, sourceId string, legacyMedia []*media.Media) ([]*media.Media, error)
}
