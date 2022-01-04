package query

import (
	"context"
	"overdoll/applications/sting/internal/domain/club"
	"overdoll/libraries/principal"
)

type ClubMemberById struct {
	Principal *principal.Principal

	AccountId string
	ClubId    string
}

type ClubMemberByIdHandler struct {
	cr club.Repository
}

func NewClubMemberByIdHandler(cr club.Repository) ClubMemberByIdHandler {
	return ClubMemberByIdHandler{cr: cr}
}

func (h ClubMemberByIdHandler) Handle(ctx context.Context, query ClubMemberById) (*club.Member, error) {

	result, err := h.cr.GetClubMemberById(ctx, query.Principal, query.ClubId, query.AccountId)

	if err != nil {
		return nil, err
	}

	return result, nil
}
