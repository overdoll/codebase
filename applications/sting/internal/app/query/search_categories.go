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
	TopicId   *string
	Slugs     []string
	SortBy    string
}

type SearchCategoriesHandler struct {
	pr post.Repository
}

func NewSearchCategoriesHandler(pr post.Repository) SearchCategoriesHandler {
	return SearchCategoriesHandler{pr: pr}
}

func (h SearchCategoriesHandler) Handle(ctx context.Context, query SearchCategories) ([]*post.Category, error) {

	filters, err := post.NewCategoryFilters(
		query.Title,
		query.SortBy,
		query.Slugs,
		query.TopicId,
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
