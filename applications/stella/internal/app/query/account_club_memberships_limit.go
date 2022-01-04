package query

import (
	"context"
	"overdoll/applications/sting/internal/domain/club"
	"overdoll/libraries/principal"
)

type AccountClubMembershipsLimit struct {
	Principal *principal.Principal
	AccountId string
}

type AccountClubMembershipsLimitHandler struct {
	cr club.Repository
}

func NewAccountClubMembershipsLimitHandler(cr club.Repository) AccountClubMembershipsLimitHandler {
	return AccountClubMembershipsLimitHandler{cr: cr}
}

func (h AccountClubMembershipsLimitHandler) Handle(ctx context.Context, query AccountClubMembershipsLimit) (int, error) {
	return club.ViewAccountClubMemberLimit(query.Principal, query.AccountId)
}
