package query

import (
	"context"
	"encoding/json"

	"overdoll/applications/hades/src/domain/search"
)

type SearchCharactersHandler struct {
	sr search.Repository
}

func NewSearchCharactersHandler(sr search.Repository) SearchCharactersHandler {
	return SearchCharactersHandler{sr: sr}
}

func (h SearchCharactersHandler) Handle(ctx context.Context, query string) ([]json.RawMessage, error) {
	return h.sr.SearchCharacters(ctx, query)
}
