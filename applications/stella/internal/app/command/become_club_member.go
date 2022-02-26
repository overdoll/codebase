package command

import (
	"context"
	"overdoll/applications/stella/internal/domain/club"
	"overdoll/applications/stella/internal/domain/event"

	"overdoll/libraries/principal"
)

type BecomeClubMember struct {
	Principal *principal.Principal
	ClubId    string
}

type BecomeClubMemberHandler struct {
	cr    club.Repository
	event event.Repository
}

func NewBecomeClubMemberHandler(cr club.Repository, event event.Repository) BecomeClubMemberHandler {
	return BecomeClubMemberHandler{cr: cr, event: event}
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

	if err := h.cr.CreateClubMember(ctx, member); err != nil {
		return nil, err
	}

	if err != nil {
		return nil, err
	}

	if err := h.event.AddClubMember(ctx, cmd.ClubId, cmd.Principal.AccountId()); err != nil {
		return nil, err
	}

	return member, nil
}
