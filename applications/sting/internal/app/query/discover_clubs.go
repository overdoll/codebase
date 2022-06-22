package query

import (
	"context"
	"overdoll/applications/sting/internal/domain/club"

	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
)

type DiscoverClubs struct {
	Principal *principal.Principal
	Cursor    *paging.Cursor
}

type DiscoverClubsHandler struct {
	cr club.Repository
}

func NewDiscoverClubsHandler(cr club.Repository) DiscoverClubsHandler {
	return DiscoverClubsHandler{cr: cr}
}

func (h DiscoverClubsHandler) Handle(ctx context.Context, query DiscoverClubs) ([]*club.Club, error) {

	results, err := h.cr.DiscoverClubs(ctx, query.Principal, query.Cursor)

	if err != nil {
		return nil, err
	}

	return results, nil
}
