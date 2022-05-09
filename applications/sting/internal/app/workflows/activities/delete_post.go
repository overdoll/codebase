package activities

import (
	"context"
)

type DeletePostInput struct {
	PostId string
}

func (h *Activities) DeletePost(ctx context.Context, input DeletePostInput) error {

	pst, err := h.pr.GetPostByIdOperator(ctx, input.PostId)

	if err != nil {
		return err
	}

	// Delete all resources
	if err := h.loader.DeleteResources(ctx, input.PostId, pst.AllContentResourceIds()); err != nil {
		return err
	}

	// delete from database
	if err := h.pr.DeletePost(ctx, input.PostId); err != nil {
		return err
	}

	return nil
}
