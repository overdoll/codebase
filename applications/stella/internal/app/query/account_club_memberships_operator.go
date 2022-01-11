package query

import (
	"context"
	"overdoll/applications/stella/internal/domain/club"
)

type AccountClubMembershipsOperator struct {
	AccountId string
}

type AccountClubMembershipsOperatorHandler struct {
	cr club.Repository
}

func NewAccountClubMembershipsOperatorHandler(cr club.Repository) AccountClubMembershipsOperatorHandler {
	return AccountClubMembershipsOperatorHandler{cr: cr}
}

func (h AccountClubMembershipsOperatorHandler) Handle(ctx context.Context, query AccountClubMembershipsOperator) ([]*club.Member, error) {

	results, err := h.cr.GetAccountClubMembershipsOperator(ctx, query.AccountId)

	if err != nil {
		return nil, err
	}

	return results, nil
}
