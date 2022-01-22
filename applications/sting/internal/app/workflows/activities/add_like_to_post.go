package activities

import (
	"context"

	"overdoll/applications/sting/internal/domain/post"
)

func (h *Activities) AddLikeToPost(ctx context.Context, postId string) error {

	pendingPost, err := h.pr.UpdatePostLikesOperator(ctx, postId, func(pending *post.Post) error {
		return pending.AddLike()
	})

	if err != nil {
		return err
	}

	// index the post
	if err := h.pi.IndexPost(ctx, pendingPost); err != nil {
		return err
	}

	return nil
}
