package query

import (
	"context"
	"errors"

	"go.uber.org/zap"
	"overdoll/applications/sting/src/domain/post"
	"overdoll/libraries/paging"
)

var (
	errFailedPostByModeratorAccount = errors.New("post by moderator account failed")
)

type PostsByModeratorAccountHandler struct {
	pr  post.IndexRepository
	eva EvaService
}

func NewPostsByModeratorAccountHandler(pr post.IndexRepository, eva EvaService) PostsByModeratorAccountHandler {
	return PostsByModeratorAccountHandler{pr: pr, eva: eva}
}

func (h PostsByModeratorAccountHandler) Handle(ctx context.Context, cursor *paging.Cursor, accountID string) ([]*post.Post, *paging.Info, error) {

	usr, err := h.eva.GetAccount(ctx, accountID)

	if err != nil {
		zap.S().Errorf("could not get user: %s", err)
		return nil, nil, errFailedPostByModeratorAccount
	}

	if usr.IsLocked() || !usr.IsModerator() {
		return nil, nil, errFailedPostByModeratorAccount
	}

	filters, err := post.NewPostFilters(accountID, "", "", "")

	if err != nil {
		return nil, nil, err
	}

	posts, page, err := h.pr.SearchPosts(ctx, cursor, filters)

	if err != nil {
		zap.S().Errorf("failed to search: %s", err)
		return nil, nil, errFailedPostByModeratorAccount
	}

	return posts, page, nil
}
