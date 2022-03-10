package activities

import (
	"context"
)

type PutPostIntoModeratorQueueOrPublishInput struct {
	PostId string
}

func (h *Activities) PutPostIntoModeratorQueueOrPublish(ctx context.Context, input PutPostIntoModeratorQueueOrPublishInput) (bool, error) {
	return h.parley.PutPostIntoModeratorQueueOrPublish(ctx, input.PostId)
}
