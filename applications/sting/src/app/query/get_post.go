package query

import (
	"context"

	"go.uber.org/zap"
	"overdoll/applications/sting/src/domain/post"
)

type GetPostHandler struct {
	pr post.Repository
}

func NewGetPendingPostHandler(pr post.Repository) GetPostHandler {
	return GetPostHandler{pr: pr}
}

func (h GetPostHandler) Handle(ctx context.Context, postId string) (*post.Post, error) {

	pst, err := h.pr.GetPost(ctx, postId)

	if err != nil {
		zap.S().Errorf("failed to search: %s", err)
		return nil, ErrSearchFailed
	}

	return pst, nil
}
