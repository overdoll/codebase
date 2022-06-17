package query

import (
	"context"
	"overdoll/applications/sting/internal/domain/club"

	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
)

type SearchClubMemberships struct {
	Principal *principal.Principal
	Cursor    *paging.Cursor
	AccountId *string
	ClubId    *string
	Supporter bool
	SortBy    string
}

type SearchClubMembershipsHandler struct {
	cr club.Repository
}

func NewSearchClubMembershipsHandler(cr club.Repository) SearchClubMembershipsHandler {
	return SearchClubMembershipsHandler{cr: cr}
}

func (h SearchClubMembershipsHandler) Handle(ctx context.Context, query SearchClubMemberships) ([]*club.Member, error) {

	filters, err := club.NewMemberFilters(query.Supporter, query.AccountId, query.ClubId, query.SortBy)

	if err != nil {
		return nil, err
	}

	results, err := h.cr.SearchClubMembers(ctx, query.Principal, query.Cursor, filters)

	if err != nil {
		return nil, err
	}

	return results, nil
}
