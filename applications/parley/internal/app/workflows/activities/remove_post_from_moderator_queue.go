package activities

import (
	"context"
)

type RemovePostFromModeratorQueueInput struct {
	PostId string
}

func (h *Activities) RemovePostFromModeratorQueue(ctx context.Context, input RemovePostFromModeratorQueueInput) error {

	if err := h.mr.DeletePostModeratorByPostId(ctx, input.PostId); err != nil {
		return err
	}

	return nil
}
