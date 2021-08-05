package activities

import (
	"context"

	"overdoll/applications/sting/internal/domain/post"
)

func (h *Activities) UndoPost(ctx context.Context, postId string) error {

	// update pending post to back in review
	pendingPost, err := h.pr.UpdatePost(ctx, postId, func(pending *post.Post) error {

		// skip job if published or discarded
		if err := pending.MakeUndo(); err != nil {
			return err
		}

		return pending.MakeReview()
	})

	if err != nil {

		if err == post.ErrNotComplete {
			return nil
		}

		return err
	}

	// Index pending post so it's bounced back into review
	return h.pi.IndexPost(ctx, pendingPost)
}
