package query

import (
	"context"

	"go.uber.org/zap"
	"overdoll/applications/sting/src/domain/post"
)

type GetPendingPostHandler struct {
	pr post.Repository
}

func NewGetPendingPostHandler(pr post.Repository) GetPendingPostHandler {
	return GetPendingPostHandler{pr: pr}
}

func (h GetPendingPostHandler) Handle(ctx context.Context, postId string) (*post.PendingPost, error) {

	pst, err := h.pr.GetPendingPost(ctx, postId)

	if err != nil {
		zap.S().Errorf("failed to search: %s", err)
		return nil, ErrSearchFailed
	}

	return pst, nil
}
