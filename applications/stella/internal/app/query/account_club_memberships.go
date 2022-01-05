package query

import (
	"context"
	"overdoll/applications/stella/internal/domain/club"

	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
)

type AccountClubMemberships struct {
	Principal *principal.Principal
	Cursor    *paging.Cursor
	AccountId string
}

type AccountClubMembershipsHandler struct {
	cr club.Repository
}

func NewAccountClubMembershipsHandler(cr club.Repository) AccountClubMembershipsHandler {
	return AccountClubMembershipsHandler{cr: cr}
}

func (h AccountClubMembershipsHandler) Handle(ctx context.Context, query AccountClubMemberships) ([]*club.Member, error) {

	results, err := h.cr.GetAccountClubMemberships(ctx, query.Principal, query.Cursor, query.AccountId)

	if err != nil {
		return nil, err
	}

	return results, nil
}
