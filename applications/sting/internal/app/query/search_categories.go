package query

import (
	"context"

	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/paging"
)

type SearchCategories struct {
	Cursor *paging.Cursor
	Title  *string
}

type SearchCategoriesHandler struct {
	pr post.IndexRepository
}

func NewSearchCategoriesHandler(pr post.IndexRepository) SearchCategoriesHandler {
	return SearchCategoriesHandler{pr: pr}
}

func (h SearchCategoriesHandler) Handle(ctx context.Context, query SearchCategories) ([]*post.Category, error) {

	results, err := h.pr.SearchCategories(ctx, query.Cursor, query.Title)

	if err != nil {
		return nil, err
	}

	return results, nil
}
