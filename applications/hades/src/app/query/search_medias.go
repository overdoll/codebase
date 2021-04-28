package query

import (
	"context"
	"encoding/json"

	"overdoll/applications/hades/src/domain/search"
)

type SearchMediasHandler struct {
	sr search.Repository
}

func NewSearchMediasHandler(sr search.Repository) SearchMediasHandler {
	return SearchMediasHandler{sr: sr}
}

func (h SearchMediasHandler) Handle(ctx context.Context, query string) ([]json.RawMessage, error) {
	return h.sr.SearchMedias(ctx, query)
}
