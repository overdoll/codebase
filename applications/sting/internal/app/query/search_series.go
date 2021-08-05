package query

import (
	"context"

	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/paging"
)

type SearchSeries struct {
	Cursor *paging.Cursor
	Title  *string
}

type SearchSeriesHandler struct {
	pr post.IndexRepository
}

func NewSearchSeriesHandler(pr post.IndexRepository) SearchSeriesHandler {
	return SearchSeriesHandler{pr: pr}
}

func (h SearchSeriesHandler) Handle(ctx context.Context, query SearchSeries) ([]*post.Series, error) {

	results, err := h.pr.SearchSeries(ctx, query.Cursor, query.Title)

	if err != nil {
		return nil, err
	}

	return results, nil
}
