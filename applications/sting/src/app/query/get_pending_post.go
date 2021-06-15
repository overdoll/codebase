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

func (h GetPendingPostsHandler) Handle(ctx context.Context, cursor *paging.Cursor, moderatorId, contributorId, artistId, userId string) (*post.PendingPostConnection, error) {

	usr, err := h.eva.GetUser(ctx, userId)

	if err != nil {
		zap.S().Errorf("could not get user: %s", err)
		return nil, ErrSearchFailed
	}

	if usr.IsLocked() {
		return nil, ErrSearchFailed
	}

	// only staff can filter
	if usr.IsStaff() {
		if moderatorId != "" {
			userId = moderatorId
		}
	} else {
		contributorId = ""
		artistId = ""
	}

	filters, err := post.NewPendingPostFilters(userId, contributorId, artistId)

	if err != nil {
		return nil, err
	}

	posts, err := h.pr.SearchPendingPosts(ctx, cursor, filters)

	if err != nil {
		zap.S().Errorf("failed to search: %s", err)
		return nil, ErrSearchFailed
	}

	return posts, nil
}
