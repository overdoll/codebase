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
		// Delete all resources
		if err := h.loader.DeleteResources(ctx, input.PostId, pending.AllContentResourceIds()); err != nil {
			return err
		}

		return pending.MakeRemoved()
	}); err != nil {
		return err
	}

	return nil
}
