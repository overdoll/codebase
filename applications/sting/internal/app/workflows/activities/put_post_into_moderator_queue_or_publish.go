package activities

import (
	"context"
)

func (h *Activities) PutPostIntoModeratorQueueOrPublish(ctx context.Context, postId string) (bool, error) {
	return h.parley.PutPostIntoModeratorQueueOrPublish(ctx, postId)
}
