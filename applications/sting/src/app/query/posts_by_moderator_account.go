package query

import (
	"context"
	"errors"

	"go.uber.org/zap"
	"overdoll/applications/sting/src/domain/post"
	"overdoll/libraries/paging"
)

type PostsByModeratorAccountHandler struct {
	pr  post.IndexRepository
	eva EvaService
}

func NewPostsByModeratorAccountHandler(pr post.IndexRepository, eva EvaService) PostsByModeratorAccountHandler {
	return PostsByModeratorAccountHandler{pr: pr, eva: eva}
}

var (
	ErrFailedPostByModeratorAccount = errors.New("post by moderator account failed")
)

func (h PostsByModeratorAccountHandler) Handle(ctx context.Context, cursor *paging.Cursor, accountID string) ([]*post.Post, *paging.Info, error) {

	usr, err := h.eva.GetAccount(ctx, accountID)

	if err != nil {
		zap.S().Errorf("could not get user: %s", err)
		return nil, nil, ErrFailedPostByModeratorAccount
	}

	if usr.IsLocked() || !usr.IsModerator() {
		return nil, nil, ErrFailedPostByModeratorAccount
	}

	filters, err := post.NewPostFilters(accountID, "", "", "")

	if err != nil {
		return nil, nil, err
	}

	posts, page, err := h.pr.SearchPosts(ctx, cursor, filters)

	if err != nil {
		zap.S().Errorf("failed to search: %s", err)
		return nil, nil, ErrFailedPostByModeratorAccount
	}

	return posts, page, nil
}
