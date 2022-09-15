package activities

import (
	"context"
	"overdoll/libraries/media/proto"
)

type CallbackService interface {
	SendCallback(ctx context.Context, source string, media *proto.Media) error
}
