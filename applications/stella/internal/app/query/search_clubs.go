package query

import (
	"context"
	"overdoll/applications/stella/internal/domain/club"

	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
)

type SearchClubs struct {
	Principal      *principal.Principal
	Cursor         *paging.Cursor
	OwnerAccountId *string
	Name           *string
	SortBy         string
	Slugs          []string
}

type SearchClubsHandler struct {
	cr club.IndexRepository
}

func NewSearchClubsHandler(cr club.IndexRepository) SearchClubsHandler {
	return SearchClubsHandler{cr: cr}
}

func (h SearchClubsHandler) Handle(ctx context.Context, query SearchClubs) ([]*club.Club, error) {

	filters, err := club.NewFilters(
		query.Name,
		query.SortBy,
		query.Slugs,
		query.OwnerAccountId,
	)

	if err != nil {
		return nil, err
	}

	results, err := h.cr.SearchClubs(ctx, query.Principal, query.Cursor, filters)

	if err != nil {
		return nil, err
	}

	return results, nil
}
