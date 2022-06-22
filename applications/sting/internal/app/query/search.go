package query

import (
	"context"
	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/paging"

	"overdoll/libraries/principal"
)

type Search struct {
	Principal *principal.Principal
	Cursor    *paging.Cursor
	Query     string
}

type SearchHandler struct {
	pr post.Repository
}

func NewSearchHandler(pr post.Repository) SearchHandler {
	return SearchHandler{pr: pr}
}

func (h SearchHandler) Handle(ctx context.Context, query Search) ([]interface{}, error) {

	results, err := h.pr.Search(ctx, query.Principal, query.Cursor, query.Query)

	if err != nil {
		return nil, err
	}

	return results, nil
}
