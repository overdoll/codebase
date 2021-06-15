package query

import (
	"context"

	"go.uber.org/zap"
	"overdoll/applications/sting/src/domain/post"
	"overdoll/libraries/paging"
)

type GetPendingPostsHandler struct {
	pr  post.IndexRepository
	eva EvaService
}

func NewGetPendingPostsHandler(pr post.IndexRepository, eva EvaService) GetPendingPostsHandler {
	return GetPendingPostsHandler{pr: pr, eva: eva}
}

func (h GetPendingPostsHandler) Handle(ctx context.Context, cursor *paging.Cursor, userId string) (*post.PendingPostConnection, error) {

	usr, err := h.eva.GetUser(ctx, userId)

	if err != nil {
		zap.S().Errorf("could not get user: %s", err)
		return nil, ErrSearchFailed
	}

	if usr.IsLocked() {
		return nil, ErrSearchFailed
	}

	filters, err := post.NewPendingPostFilters(userId)

	if err != nil {
		return nil, err
	}

	posts, err := h.pr.SearchPendingPosts(ctx, filters)

	if err != nil {
		zap.S().Errorf("failed to search: %s", err)
		return nil, ErrSearchFailed
	}

	return posts, nil
}
