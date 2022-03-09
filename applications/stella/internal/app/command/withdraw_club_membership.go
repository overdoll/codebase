package command

import (
	"context"
	"overdoll/applications/stella/internal/domain/club"
	"overdoll/applications/stella/internal/domain/event"

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

	if err := h.cr.DeleteClubMember(ctx, cmd.Principal, cmd.ClubId, cmd.Principal.AccountId()); err != nil {
		return err
	}

	if err := h.event.RemoveClubMember(ctx, cmd.ClubId, cmd.Principal.AccountId()); err != nil {
		return err
	}

	return nil
}
