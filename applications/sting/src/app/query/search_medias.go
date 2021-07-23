package query

import (
	"context"
	"errors"

	"go.uber.org/zap"
	"overdoll/applications/sting/src/domain/post"
	"overdoll/libraries/paging"
)

var (
	errSearchFailed = errors.New("search failed")
)

type SearchMediasHandler struct {
	pr post.IndexRepository
}

func NewSearchMediasHandler(pr post.IndexRepository) SearchMediasHandler {
	return SearchMediasHandler{pr: pr}
}

func (h SearchMediasHandler) Handle(ctx context.Context, cursor *paging.Cursor, query string) ([]*post.Media, error) {

	results, err := h.pr.SearchMedias(ctx, cursor, query)

	if err != nil {
		zap.S().Errorf("failed to search: %s", err)
		return nil, errSearchFailed
	}

	return results, nil
}
