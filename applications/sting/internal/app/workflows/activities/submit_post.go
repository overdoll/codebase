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

		// Process content (mime-type checks, etc...)
		cnt, err := h.cr.ProcessContent(ctx, pending.ContributorId(), pending.Content())

		if err != nil {
			return err
		}

		// update content
		pending.UpdateContent(cnt)

		return nil
	})

	if err != nil {
		return err
	}

	// Update pending post index
	return h.pi.IndexPost(ctx, pendingPost)
}