package query

import (
	"context"

	"go.uber.org/zap"
	"overdoll/applications/sting/src/domain/post"
)

type SearchArtistsHandler struct {
	pr post.IndexRepository
}

func NewSearchArtistsHandler(pr post.IndexRepository) SearchArtistsHandler {
	return SearchArtistsHandler{pr: pr}
}

func (h SearchArtistsHandler) Handle(ctx context.Context, query string) ([]*post.Artist, error) {

	arts, err := h.pr.SearchArtists(ctx, query)

	if err != nil {
		zap.S().Errorf("failed to search: %s", err)
		return nil, ErrSearchFailed
	}

	return arts, nil
}
