package query

import (
	"context"

	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
)

type SearchCategories struct {
	Principal *principal.Principal
	Cursor    *paging.Cursor
	Title     *string
	Slugs     []string
	OrderBy   string
}

type SearchCategoriesHandler struct {
	pr post.IndexRepository
}

func NewSearchCategoriesHandler(pr post.IndexRepository) SearchCategoriesHandler {
	return SearchCategoriesHandler{pr: pr}
}

func (h SearchCategoriesHandler) Handle(ctx context.Context, query SearchCategories) ([]*post.Category, error) {

	filters, err := post.NewObjectFilters(
		query.Title,
		query.OrderBy,
		query.Slugs,
	)

	if err != nil {
		return nil, err
	}

	results, err := h.pr.SearchCategories(ctx, query.Principal, query.Cursor, filters)

	if err != nil {
		return nil, err
	}

	return results, nil
}
