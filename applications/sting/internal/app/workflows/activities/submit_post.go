package activities

import (
	"context"

	"overdoll/applications/sting/internal/domain/post"
)

func (h *Activities) SubmitPost(ctx context.Context, postId string) error {

	pendingPost, err := h.pr.UpdatePost(ctx, postId, func(pending *post.Post) error {
		// make post in review
		if err := pending.MakeReview(); err != nil {
			return err
		}

		postPrefix := "/posts/" + pending.ID() + "/"

		// Process content (mime-type checks, etc...)
		// add a prefix
		return h.rr.ProcessResources(ctx, postPrefix, pending.Content())
	})

	if err != nil {
		return err
	}

	// Update pending post index
	return h.pi.IndexPost(ctx, pendingPost)
}
