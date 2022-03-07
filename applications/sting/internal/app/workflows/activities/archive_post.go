package activities

import (
	"context"

	"overdoll/applications/sting/internal/domain/post"
)

func (h *Activities) ArchivePost(ctx context.Context, postId string) error {

	pendingPost, err := h.pr.UpdatePost(ctx, postId, func(pending *post.Post) error {
		return pending.MakeArchived()
	})

	if err != nil {
		return err
	}

	// index pending post
	return h.pi.IndexPost(ctx, pendingPost)
}
