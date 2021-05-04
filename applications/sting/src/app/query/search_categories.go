package query

import (
	"context"

	"overdoll/applications/sting/src/domain/post"
)

type SearchCategoriesHandler struct {
	pr post.IndexRepository
}

func NewSearchCategoriesHandler(pr post.IndexRepository) SearchCategoriesHandler {
	return SearchCategoriesHandler{pr: pr}
}

func (h SearchCategoriesHandler) Handle(ctx context.Context, query string) ([]*post.Category, error) {
	return h.pr.SearchCategories(ctx, query)
}
