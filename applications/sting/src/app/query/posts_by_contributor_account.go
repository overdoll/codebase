package query

import (
	"context"
	"errors"

	"go.uber.org/zap"
	"overdoll/applications/sting/src/domain/post"
	"overdoll/libraries/paging"
)

var (
	errFailedPostByContributorAccount = errors.New("post by contributor account failed")
)

type PostsByContributorAccountHandler struct {
	pr post.IndexRepository
}

func NewPostsByContributorAccountHandler(pr post.IndexRepository) PostsByContributorAccountHandler {
	return PostsByContributorAccountHandler{pr: pr}
}

func (h PostsByContributorAccountHandler) Handle(ctx context.Context, cursor *paging.Cursor, accountID string) ([]*post.Post, *paging.Info, error) {

	filters, err := post.NewPostFilters("", accountID, "", "")

	if err != nil {
		return nil, nil, err
	}

	posts, page, err := h.pr.SearchPosts(ctx, cursor, filters)

	if err != nil {
		zap.S().Errorf("failed to search: %s", err)
		return nil, nil, errFailedPostByContributorAccount
	}

	return posts, page, nil
}
