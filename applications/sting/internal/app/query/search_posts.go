package query

import (
	"context"
	"errors"

	"go.uber.org/zap"
	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/paging"
)

var (
	errFailedSearchPosts = errors.New("search posts failed")
)

type SearchPostsHandler struct {
	pr post.IndexRepository
}

func NewSearchPostsHandler(pr post.IndexRepository) SearchPostsHandler {
	return SearchPostsHandler{pr: pr}
}

func (h SearchPostsHandler) Handle(ctx context.Context, cursor *paging.Cursor, moderatorId, contributorId, artistId string, categoryIds, characterIds, mediaIds []string) ([]*post.Post, error) {

	filters, err := post.NewPostFilters(moderatorId, contributorId, artistId, categoryIds, characterIds, mediaIds)

	if err != nil {
		return nil, err
	}

	posts, err := h.pr.SearchPosts(ctx, cursor, filters)

	if err != nil {
		zap.S().Errorf("failed to search: %s", err)
		return nil, errFailedSearchPosts
	}

	return posts, nil
}
