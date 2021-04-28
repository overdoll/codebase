package query

import (
	"context"
	"encoding/json"

	"overdoll/applications/hades/src/domain/search"
)

type SearchArtistsHandler struct {
	sr search.Repository
}

func NewSearchArtistsHandler(sr search.Repository) SearchArtistsHandler {
	return SearchArtistsHandler{sr: sr}
}

func (h SearchArtistsHandler) Handle(ctx context.Context, query string) ([]json.RawMessage, error) {
	return h.sr.SearchArtists(ctx, query)
}
