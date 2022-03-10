package activities

import (
	"context"
	"overdoll/applications/parley/internal/domain/moderator"
)

type AddPostToQueueInput struct {
	PostId      string
	ModeratorId string
}

func (h *Activities) AddPostToQueue(ctx context.Context, input AddPostToQueueInput) error {

	queue, err := moderator.NewPostModerator(input.ModeratorId, input.PostId)

	if err != nil {
		return err
	}

	if err := h.mr.CreatePostModerator(ctx, queue); err != nil {
		return err
	}

	return nil
}
