package activities

import (
	"context"

	"overdoll/applications/sting/internal/domain/post"
)

func (h *Activities) RemovePost(ctx context.Context, postId string) error {

	pendingPost, err := h.pr.UpdatePost(ctx, postId, func(pending *post.Post) error {

		res, err := h.rr.GetResourcesByIds(ctx, postId, pending.ContentResourceIds())

		if err != nil {
			return err
		}

		// On discarded posts, delete the content from S3
		if err := h.rr.DeleteResources(ctx, res); err != nil {
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
