package activities

import (
	"context"
)

func (h *Activities) DeletePost(ctx context.Context, postId string) error {

	pst, err := h.pr.GetPostByIdOperator(ctx, postId)

	if err != nil {
		return err
	}

	// Delete all resources
	if err := h.loader.DeleteResources(ctx, postId, pst.AllContentResourceIds()); err != nil {
		return err
	}

	// delete from index
	if err := h.pi.DeletePost(ctx, postId); err != nil {
		return err
	}

	// delete from database
	if err := h.pr.DeletePost(ctx, postId); err != nil {
		return err
	}

	return nil
}
