package query

import (
	"context"

	"go.uber.org/zap"
	"overdoll/applications/sting/src/domain/post"
	"overdoll/libraries/paging"
)

type SearchCategoriesHandler struct {
	pr post.IndexRepository
}

func NewSearchCategoriesHandler(pr post.IndexRepository) SearchCategoriesHandler {
	return SearchCategoriesHandler{pr: pr}
}

func (h SearchCategoriesHandler) Handle(ctx context.Context, cursor *paging.Cursor, query string) ([]*post.Category, *paging.Info, error) {

	results, page, err := h.pr.SearchCategories(ctx, cursor, query)

	if err != nil {
		zap.S().Errorf("failed to search: %s", err)
		return nil, nil, ErrSearchFailed
	}

	return results, page, nil
}
