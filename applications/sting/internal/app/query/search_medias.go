package query

import (
	"context"

	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/paging"
)

type SearchMedias struct {
	Cursor *paging.Cursor
	Title  *string
}

type SearchMediasHandler struct {
	pr post.IndexRepository
}

func NewSearchMediasHandler(pr post.IndexRepository) SearchMediasHandler {
	return SearchMediasHandler{pr: pr}
}

func (h SearchMediasHandler) Handle(ctx context.Context, query SearchMedias) ([]*post.Series, error) {

	results, err := h.pr.SearchSeries(ctx, query.Cursor, query.Title)

	if err != nil {
		return nil, err
	}

	return results, nil
}
