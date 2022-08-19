package query

import (
	"context"
	"overdoll/applications/sting/internal/domain/club"

	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
)

type SearchClubs struct {
	Principal      *principal.Principal
	Cursor         *paging.Cursor
	OwnerAccountId *string
	Name           *string
	SortBy         string
	Suspended      *bool
	Slugs          []string
	Terminated     *bool
	ExcludeEmpty   bool
}

type SearchClubsHandler struct {
	cr club.Repository
}

func NewSearchClubsHandler(cr club.Repository) SearchClubsHandler {
	return SearchClubsHandler{cr: cr}
}

func (h SearchClubsHandler) Handle(ctx context.Context, query SearchClubs) ([]*club.Club, error) {

	filters, err := club.NewFilters(
		query.Name,
		query.Suspended,
		query.SortBy,
		query.Slugs,
		query.OwnerAccountId,
		query.Terminated,
		query.ExcludeEmpty,
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
