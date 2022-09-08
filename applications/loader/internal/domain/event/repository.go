package event

import (
	"context"
	"overdoll/libraries/media"
)

type Repository interface {
	SendProcessMediaHeartbeat(ctx context.Context, token []byte, heartbeat int64) error
	ProcessMediaForUpload(ctx context.Context, media *media.Media, source string) error
	GenerateImageFromMedia(ctx context.Context, media *media.Media, newMedia *media.Media, source string, pixelate *int) error
}
