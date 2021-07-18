package query

import (
	"context"

	"go.uber.org/zap"
	"overdoll/applications/sting/src/domain/post"
	"overdoll/libraries/paging"
)

type SearchArtistsHandler struct {
	pr post.IndexRepository
}

func NewSearchArtistsHandler(pr post.IndexRepository) SearchArtistsHandler {
	return SearchArtistsHandler{pr: pr}
}

func (h SearchArtistsHandler) Handle(ctx context.Context, cursor *paging.Cursor, query string) ([]*post.Artist, *paging.Info, error) {

	results, paging, err := h.pr.SearchArtists(ctx, cursor, query)

	if err != nil {
		zap.S().Errorf("failed to search: %s", err)
		return nil, nil, ErrSearchFailed
	}

	return results, paging, nil
}
