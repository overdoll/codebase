package activities

import (
	"context"
	"time"

	"overdoll/applications/sting/internal/domain/post"
)

type SubmitPostInput struct {
	PostId   string
	PostDate time.Time
}

func (h *Activities) SubmitPost(ctx context.Context, input SubmitPostInput) error {

	pendingPost, err := h.pr.UpdatePost(ctx, input.PostId, func(pending *post.Post) error {
		return pending.UpdatePostPostedDate(input.PostDate)
	})

	if err != nil {
		return err
	}

	// Update pending post index
	return h.pi.IndexPost(ctx, pendingPost)
}
