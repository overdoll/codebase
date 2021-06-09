package query

import (
	"context"

	"go.uber.org/zap"
	"overdoll/applications/sting/src/domain/post"
)

type GetPendingPostsHandler struct {
	pr  post.IndexRepository
	eva EvaService
}

func NewGetPendingPostsHandler(pr post.IndexRepository, eva EvaService) GetPendingPostsHandler {
	return GetPendingPostsHandler{pr: pr, eva: eva}
}

func (h GetPendingPostsHandler) Handle(ctx context.Context, userId string) ([]*post.PostPending, error) {

	query := userId

	usr, err := h.eva.GetUser(ctx, userId)

	if err != nil {
		zap.S().Errorf("could not get user: %s", err)
		return nil, ErrSearchFailed
	}

	// If user is staff, show all posts
	if usr.HasRoles([]string{"staff"}) {
		query = ""
	}

	posts, err := h.pr.SearchPendingPosts(ctx, query)

	if err != nil {
		zap.S().Errorf("failed to search: %s", err)
		return nil, ErrSearchFailed
	}

	return posts, nil
}
