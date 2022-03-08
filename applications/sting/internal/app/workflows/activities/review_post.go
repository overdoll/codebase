package activities

import (
	"context"
	"overdoll/applications/sting/internal/domain/post"
)

type ReviewPostInput struct {
	PostId string
}

func (h *Activities) ReviewPost(ctx context.Context, input ReviewPostInput) error {

	pendingPost, err := h.pr.UpdatePost(ctx, input.PostId, func(pending *post.Post) error {
		return pending.MakeReview()
	})

	if err != nil {
		return err
	}

	// Update pending post index
	return h.pi.IndexPost(ctx, pendingPost)
}
