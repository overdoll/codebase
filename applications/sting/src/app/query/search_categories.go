package query

import (
	"context"

	"go.uber.org/zap"
	"overdoll/applications/sting/src/domain/post"
)

type SearchCategoriesHandler struct {
	pr post.IndexRepository
}

func NewSearchCategoriesHandler(pr post.IndexRepository) SearchCategoriesHandler {
	return SearchCategoriesHandler{pr: pr}
}

func (h SearchCategoriesHandler) Handle(ctx context.Context, query string) ([]*post.Category, error) {

	cats, err := h.pr.SearchCategories(ctx, query)

	if err != nil {
		zap.S().Errorf("failed to search: %s", err)
		return nil, ErrSearchFailed
	}

	return cats, nil
}
