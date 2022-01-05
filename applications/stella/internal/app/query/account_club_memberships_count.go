package query

import (
	"context"
	"overdoll/applications/stella/internal/domain/club"

	"overdoll/libraries/principal"
)

type AccountClubMembershipsCount struct {
	Principal *principal.Principal
	AccountId string
}

type AccountClubMembershipsCountHandler struct {
	cr club.Repository
}

func NewAccountClubMembershipsCountHandler(cr club.Repository) AccountClubMembershipsCountHandler {
	return AccountClubMembershipsCountHandler{cr: cr}
}

func (h AccountClubMembershipsCountHandler) Handle(ctx context.Context, query AccountClubMembershipsCount) (int, error) {

	results, err := h.cr.GetAccountClubMembershipsCount(ctx, query.Principal, query.AccountId)

	if err != nil {
		return 0, err
	}

	return results, nil
}
