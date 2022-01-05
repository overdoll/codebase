package activities

import (
	"context"

	"overdoll/applications/sting/internal/domain/post"
)

func (h *Activities) RemovePost(ctx context.Context, postId string) error {

	pendingPost, err := h.pr.UpdatePost(ctx, postId, func(pending *post.Post) error {
		// Delete all resources
		if err := h.loader.DeleteResources(ctx, postId, pending.ContentResourceIds()); err != nil {
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
