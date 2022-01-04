package query

import (
	"context"
	"overdoll/applications/sting/internal/domain/club"

	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
)

type ClubMembersByClub struct {
	Principal *principal.Principal
	Cursor    *paging.Cursor
	ClubId    string
}

type ClubMembersByClubHandler struct {
	cr club.Repository
}

func NewClubMembersByClubHandler(cr club.Repository) ClubMembersByClubHandler {
	return ClubMembersByClubHandler{cr: cr}
}

func (h ClubMembersByClubHandler) Handle(ctx context.Context, query ClubMembersByClub) ([]*club.Member, error) {

	results, err := h.cr.GetMembersForClub(ctx, query.Principal, query.Cursor, query.ClubId)

	if err != nil {
		return nil, err
	}

	return results, nil
}
