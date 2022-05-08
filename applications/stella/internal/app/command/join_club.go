package command

import (
	"context"
	"overdoll/applications/stella/internal/domain/club"
	"overdoll/applications/stella/internal/domain/event"

	"overdoll/libraries/principal"
)

type JoinClub struct {
	Principal *principal.Principal
	ClubId    string
}

type JoinClubHandler struct {
	cr    club.Repository
	event event.Repository
}

func NewJoinClubHandler(cr club.Repository, event event.Repository) JoinClubHandler {
	return JoinClubHandler{cr: cr, event: event}
}

func (h JoinClubHandler) Handle(ctx context.Context, cmd JoinClub) (*club.Member, error) {

	clb, err := h.cr.GetClubById(ctx, cmd.ClubId)

	if err != nil {
		return nil, err
	}

	// get all account memberships
	ships, err := h.cr.GetAccountClubMembershipsCount(ctx, cmd.Principal, cmd.Principal.AccountId())

	if err != nil {
		return nil, err
	}

	member, err := club.NewMember(cmd.Principal, clb, ships)

	if err != nil {
		return nil, err
	}

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
