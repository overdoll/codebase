package query

import (
	"context"

	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
)

type SearchClubs struct {
	Principal *principal.Principal
	Cursor    *paging.Cursor
	Name      *string
	OrderBy   string
	Slugs     []string
}

type SearchClubsHandler struct {
	pr post.IndexRepository
}

func NewSearchClubsHandler(pr post.IndexRepository) SearchClubsHandler {
	return SearchClubsHandler{pr: pr}
}

func (h SearchClubsHandler) Handle(ctx context.Context, query SearchClubs) ([]*post.Club, error) {

	filters, err := post.NewObjectFilters(
		query.Name,
		query.OrderBy,
		query.Slugs,
	)

	if err != nil {
		return nil, err
	}

	results, err := h.pr.SearchClubs(ctx, query.Principal, query.Cursor, filters)

	if err != nil {
		return nil, err
	}

	return results, nil
}
