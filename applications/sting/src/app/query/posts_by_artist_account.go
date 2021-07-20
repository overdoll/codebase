package query

import (
	"context"
	"errors"

	"go.uber.org/zap"
	"overdoll/applications/sting/src/domain/post"
	"overdoll/libraries/paging"
)

var (
	errFailedPostByArtistAccount = errors.New("post by artist account failed")
)

type PostsByArtistAccountHandler struct {
	pr post.IndexRepository
}

func NewPostsByArtistAccountHandler(pr post.IndexRepository) PostsByArtistAccountHandler {
	return PostsByArtistAccountHandler{pr: pr}
}

func (h PostsByArtistAccountHandler) Handle(ctx context.Context, cursor *paging.Cursor, accountID string) ([]*post.Post, *paging.Info, error) {

	filters, err := post.NewPostFilters("", "", accountID, "")

	if err != nil {
		return nil, nil, err
	}

	posts, page, err := h.pr.SearchPosts(ctx, cursor, filters)

	if err != nil {
		zap.S().Errorf("failed to search: %s", err)
		return nil, nil, errFailedPostByArtistAccount
	}

	return posts, page, nil
}
