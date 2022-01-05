package command

import (
	"context"
	"overdoll/applications/stella/internal/domain/club"

	"overdoll/libraries/principal"
)

type BecomeClubMember struct {
	Principal *principal.Principal
	ClubId    string
}

type BecomeClubMemberHandler struct {
	cr club.Repository
}

func NewBecomeClubMemberHandler(cr club.Repository) BecomeClubMemberHandler {
	return BecomeClubMemberHandler{cr: cr}
}

func (h BecomeClubMemberHandler) Handle(ctx context.Context, cmd BecomeClubMember) (*club.Member, error) {

	clb, err := h.cr.GetClubById(ctx, cmd.ClubId)

	if err != nil {
		return nil, err
	}

	// get all account memberships
	ships, err := h.cr.GetAccountClubMemberships(ctx, cmd.Principal, nil, cmd.Principal.AccountId())

	if err != nil {
		return nil, err
	}

	member, err := club.NewMember(cmd.Principal, clb, ships)

	if err := h.cr.CreateClubMember(ctx, cmd.Principal, member); err != nil {
		return nil, err
	}

	if err != nil {
		return nil, err
	}

	return member, nil
}
