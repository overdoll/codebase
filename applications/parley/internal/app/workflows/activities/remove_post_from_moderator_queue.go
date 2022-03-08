package activities

import (
	"context"
)

type RemovePostFromModeratorQueueInput struct {
	PostId string
}

func (h *Activities) RemovePostFromModeratorQueue(ctx context.Context, input RemovePostFromModeratorQueueInput) error {

	queue, err := h.mr.GetPostModeratorByPostIdOperator(ctx, input.PostId)

	if err != nil {
		return err
	}

	if err := h.mr.DeletePostModerator(ctx, queue); err != nil {
		return err
	}

	return nil
}
