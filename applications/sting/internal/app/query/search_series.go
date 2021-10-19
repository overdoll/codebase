package query

import (
	"context"

	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
)

type SearchSeries struct {
	Principal *principal.Principal
	Cursor    *paging.Cursor
	Slugs     []string
	OrderBy   string
	Title     *string
}

type SearchSeriesHandler struct {
	pr post.IndexRepository
}

func NewSearchSeriesHandler(pr post.IndexRepository) SearchSeriesHandler {
	return SearchSeriesHandler{pr: pr}
}

func (h SearchSeriesHandler) Handle(ctx context.Context, query SearchSeries) ([]*post.Series, error) {

	filters, err := post.NewObjectFilters(
		query.Title,
		query.OrderBy,
		query.Slugs,
	)

	if err != nil {
		return nil, err
	}

	results, err := h.pr.SearchSeries(ctx, query.Principal, query.Cursor, filters)

	if err != nil {
		return nil, err
	}

	return results, nil
}
