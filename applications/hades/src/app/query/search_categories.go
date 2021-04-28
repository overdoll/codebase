package query

import (
	"context"
	"encoding/json"

	"overdoll/applications/hades/src/domain/search"
)

type SearchCategoriesHandler struct {
	sr search.Repository
}

func NewSearchCategoriesHandler(sr search.Repository) SearchCategoriesHandler {
	return SearchCategoriesHandler{sr: sr}
}

func (h SearchCategoriesHandler) Handle(ctx context.Context, query string) ([]json.RawMessage, error) {
	return h.sr.SearchCategories(ctx, query)
}
