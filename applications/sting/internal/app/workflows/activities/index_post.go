package activities

import (
	"context"
)

func (h *Activities) IndexPost(ctx context.Context, postId string) error {

	pendingPost, err := h.pr.GetPostByIdOperator(ctx, postId)

	if err != nil {
		return err
	}

	return h.pi.IndexPost(ctx, pendingPost)
}
