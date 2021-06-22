package query

import (
	"context"

	"go.uber.org/zap"
	"overdoll/applications/sting/src/domain/post"
)

type GetPendingPostAuthenticatedHandler struct {
	pr  post.Repository
	eva EvaService
}

func NewGetPendingPostAuthenticatedHandler(pr post.Repository, eva EvaService) GetPendingPostAuthenticatedHandler {
	return GetPendingPostAuthenticatedHandler{pr: pr, eva: eva}
}

func (h GetPendingPostAuthenticatedHandler) Handle(ctx context.Context, postId, userId string) (*post.PendingPost, error) {

	usr, err := h.eva.GetUser(ctx, userId)

	if err != nil {
		zap.S().Errorf("could not get user: %s", err)
		return nil, ErrSearchFailed
	}

	if usr.IsLocked() || !usr.IsModerator() {
		return nil, ErrSearchFailed
	}

	pst, err := h.pr.GetPendingPost(ctx, postId)

	if err != nil {
		zap.S().Errorf("failed to search: %s", err)
		return nil, ErrSearchFailed
	}

	if !usr.IsStaff() && pst.ModeratorId() != userId {
		return nil, ErrSearchFailed
	}

	return pst, nil
}
