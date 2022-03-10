package activities

import (
	"context"

	"overdoll/applications/sting/internal/domain/post"
)

type DiscardPostInput struct {
	PostId string
}

func (h *Activities) DiscardPost(ctx context.Context, input DiscardPostInput) error {

	pendingPost, err := h.pr.UpdatePost(ctx, input.PostId, func(pending *post.Post) error {
		// Delete all resources
		if err := h.loader.DeleteResources(ctx, input.PostId, pending.AllContentResourceIds()); err != nil {
			return err
		}

		return pending.MakeDiscarded()
	})

	if err != nil {
		return err
	}

	// delete document because it's been processed
	if err := h.pi.DeletePost(ctx, pendingPost.ID()); err != nil {
		return err
	}

	return nil
}
