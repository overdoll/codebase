package query

import (
	"context"

	"go.uber.org/zap"
	"overdoll/applications/sting/src/domain/post"
	"overdoll/libraries/paging"
)

type GetPostsForModeratorHandler struct {
	pr  post.IndexRepository
	eva EvaService
}

func NewGetPendingPostsForModeratorHandler(pr post.IndexRepository, eva EvaService) GetPostsForModeratorHandler {
	return GetPostsForModeratorHandler{pr: pr, eva: eva}
}

func (h GetPostsForModeratorHandler) Handle(ctx context.Context, cursor *paging.Cursor, accountID string) ([]*post.Post, *paging.Info, error) {

	usr, err := h.eva.GetAccount(ctx, accountID)

	if err != nil {
		zap.S().Errorf("could not get user: %s", err)
		return nil, nil, ErrSearchFailed
	}

	if usr.IsLocked() || !usr.IsModerator() {
		return nil, nil, ErrSearchFailed
	}

	filters, err := post.NewPostFilters(accountID, "", "", "")

	if err != nil {
		return nil, nil, err
	}

	posts, page, err := h.pr.SearchPosts(ctx, cursor, filters)

	if err != nil {
		zap.S().Errorf("failed to search: %s", err)
		return nil, nil, ErrSearchFailed
	}

	return posts, page, nil
}
