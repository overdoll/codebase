package query

import (
	"context"

	"go.uber.org/zap"
	"overdoll/applications/sting/src/domain/post"
)

type GetPendingPostsHandler struct {
	pr post.IndexRepository
}

func NewGetPendingPostsHandler(pr post.IndexRepository) GetPendingPostsHandler {
	return GetPendingPostsHandler{pr: pr}
}

func (h GetPendingPostsHandler) Handle(ctx context.Context, query string) ([]*post.PostPending, error) {

	posts, err := h.pr.SearchPendingPosts(ctx, query)

	if err != nil {
		zap.S().Errorf("failed to search: %s", err)
		return nil, ErrSearchFailed
	}

	return posts, nil
}
