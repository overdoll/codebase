package activities

import (
	"context"

	"overdoll/applications/sting/internal/domain/post"
)

type RemoveLikeFromPostInput struct {
	PostId string
}

func (h *Activities) RemoveLikeFromPost(ctx context.Context, input RemoveLikeFromPostInput) error {

	pendingPost, err := h.pr.UpdatePostLikesOperator(ctx, input.PostId, func(pending *post.Post) error {
		return pending.RemoveLike()
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
