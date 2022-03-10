package activities

import (
	"context"

	"overdoll/applications/sting/internal/domain/post"
)

type AddLikeToPostInput struct {
	PostId string
}

func (h *Activities) AddLikeToPost(ctx context.Context, input AddLikeToPostInput) error {

	pendingPost, err := h.pr.UpdatePostLikesOperator(ctx, input.PostId, func(pending *post.Post) error {
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
