package activities

import (
	"context"
	"overdoll/applications/sting/internal/domain/post"
)

type RemovePostInput struct {
	PostId string
}

func (h *Activities) RemovePost(ctx context.Context, input RemovePostInput) error {

	if err := h.pr.UpdatePostContentAndState(ctx, input.PostId, func(pending *post.Post) error {
		return pending.MakeRemoved()
	}); err != nil {
		return err
	}

	return nil
}
