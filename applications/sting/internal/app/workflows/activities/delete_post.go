package activities

import (
	"context"
)

type DeletePostInput struct {
	PostId string
}

func (h *Activities) DeletePost(ctx context.Context, input DeletePostInput) error {

	_, err := h.pr.GetPostByIdOperator(ctx, input.PostId)

	if err != nil {
		return err
	}

	if err := h.event.CancelPost(ctx, input.PostId); err != nil {
		return err
	}

	// delete from database
	if err := h.pr.DeletePost(ctx, input.PostId); err != nil {
		return err
	}

	return nil
}
