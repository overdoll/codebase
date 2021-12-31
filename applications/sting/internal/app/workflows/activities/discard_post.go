package activities

import (
	"context"

	"overdoll/applications/sting/internal/domain/post"
)

func (h *Activities) DiscardPost(ctx context.Context, postId string) error {

	pendingPost, err := h.pr.UpdatePost(ctx, postId, func(pending *post.Post) error {

		// On discarded posts, delete the content from S3
		if err := h.rr.DeleteProcessedResources(ctx, pending.Content()); err != nil {
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
