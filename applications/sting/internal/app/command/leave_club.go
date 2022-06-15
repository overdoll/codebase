package command

import (
	"context"
	"overdoll/applications/sting/internal/domain/club"
	"overdoll/applications/sting/internal/domain/event"

	"overdoll/libraries/principal"
)

type LeaveClub struct {
	Principal *principal.Principal
	ClubId    string
}

type LeaveClubHandler struct {
	cr    club.Repository
	event event.Repository
}

func NewLeaveClubHandler(cr club.Repository, event event.Repository) LeaveClubHandler {
	return LeaveClubHandler{cr: cr, event: event}
}

func (h LeaveClubHandler) Handle(ctx context.Context, cmd LeaveClub) error {

	mclub, err := h.cr.GetClubById(ctx, cmd.ClubId)

	if err != nil {
		return err
	}

	clb, err := h.cr.GetClubMemberById(ctx, cmd.Principal, cmd.ClubId, cmd.Principal.AccountId())

	if err != nil {
		return err
	}

	if err := clb.CanRevokeClubMembership(cmd.Principal, mclub); err != nil {
		return err
	}

	return h.event.RemoveClubMember(ctx, clb)
}
