package activities

import (
	"context"
	"overdoll/applications/sting/internal/domain/post"
)

type RemovePostInput struct {
	PostId string
}

func (h *Activities) RemovePost(ctx context.Context, input RemovePostInput) error {

	pendingPost, err := h.pr.UpdatePost(ctx, input.PostId, func(pending *post.Post) error {
		// Delete all resources
		if err := h.loader.DeleteResources(ctx, input.PostId, pending.AllContentResourceIds()); err != nil {
			return err
		}

		return pending.MakeRemoved()
	})

	if err != nil {
		return err
	}

	if err := h.pi.IndexPost(ctx, pendingPost); err != nil {
		return err
	}

	return nil
}
