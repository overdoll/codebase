package query

import (
	"context"

	"go.uber.org/zap"
	"overdoll/applications/sting/src/domain/post"
	"overdoll/libraries/passport"
)

type GetPendingPostsHandler struct {
	pr  post.IndexRepository
	eva EvaService
}

func NewGetPendingPostsHandler(pr post.IndexRepository, eva EvaService) GetPendingPostsHandler {
	return GetPendingPostsHandler{pr: pr, eva: eva}
}

func (h GetPendingPostsHandler) Handle(ctx context.Context) ([]*post.PostPending, error) {

	pass := passport.FromContext(ctx)

	if !pass.IsAuthenticated() {
		return nil, ErrSearchFailed
	}

	query := pass.UserID()

	usr, err := h.eva.GetUser(ctx, pass.UserID())

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
