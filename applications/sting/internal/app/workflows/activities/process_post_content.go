package activities

import (
	"context"
)

func (h *Activities) ProcessPostContent(ctx context.Context, postId string) error {

	pst, err := h.pr.GetPostByIdOperator(ctx, postId)

	if err != nil {
		return err
	}

	postPrefix := "/posts/" + postId + "/"

	return h.rr.ProcessResourcesFromIds(ctx, postPrefix, postId, pst.ContentResourceIds())
}
