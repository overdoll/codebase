package query

import (
	"context"

	"go.uber.org/zap"
	"overdoll/applications/sting/src/domain/post"
	"overdoll/libraries/graphql/relay"
)

type GetPendingPostsForModeratorHandler struct {
	pr  post.IndexRepository
	eva EvaService
}

func NewGetPendingPostsForModeratorHandler(pr post.IndexRepository, eva EvaService) GetPendingPostsForModeratorHandler {
	return GetPendingPostsForModeratorHandler{pr: pr, eva: eva}
}

func (h GetPendingPostsForModeratorHandler) Handle(ctx context.Context, cursor *relay.Cursor, accountID string) ([]*post.PendingPost, *relay.Paging, error) {

	usr, err := h.eva.GetAccount(ctx, userId)

	if err != nil {
		zap.S().Errorf("could not get user: %s", err)
		return nil, ErrSearchFailed
	}

	if usr.IsLocked() || !usr.IsModerator() {
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

	filters, err := post.NewPendingPostFilters(userId, contributorId, artistId, id)

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
