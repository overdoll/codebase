package query

import (
	"context"

	"overdoll/applications/sting/src/domain/post"
)

type SearchArtistsHandler struct {
	pr post.IndexRepository
}

func NewSearchArtistsHandler(pr post.IndexRepository) SearchArtistsHandler {
	return SearchArtistsHandler{pr: pr}
}

func (h SearchArtistsHandler) Handle(ctx context.Context, query string) ([]*post.Artist, error) {
	return h.pr.SearchArtists(ctx, query)
}
