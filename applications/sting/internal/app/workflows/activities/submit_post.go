package activities

import (
	"context"
	"time"

	"overdoll/applications/sting/internal/domain/post"
)

func (h *Activities) SubmitPost(ctx context.Context, postId string, postDate time.Time) error {

	pendingPost, err := h.pr.UpdatePost(ctx, postId, func(pending *post.Post) error {
		return pending.UpdatePostPostedDate(postDate)
	})

	if err != nil {
		return err
	}

	// Update pending post index
	return h.pi.IndexPost(ctx, pendingPost)
}
