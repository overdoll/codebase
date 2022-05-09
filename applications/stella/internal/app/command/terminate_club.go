package command

import (
	"context"
	"overdoll/applications/stella/internal/domain/club"
	"overdoll/applications/stella/internal/domain/event"
	"overdoll/libraries/principal"
)

type TerminateClub struct {
	Principal *principal.Principal
	ClubId    string
}

type TerminateClubHandler struct {
	cr    club.Repository
	event event.Repository
}

func NewTerminateClubHandler(cr club.Repository, event event.Repository) TerminateClubHandler {
	return TerminateClubHandler{cr: cr, event: event}
}

func (h TerminateClubHandler) Handle(ctx context.Context, cmd TerminateClub) (*club.Club, error) {

	clb, err := h.cr.GetClubById(ctx, cmd.ClubId)

	if err != nil {
		return nil, err
	}

	if err := clb.CanTerminate(cmd.Principal); err != nil {
		return nil, err
	}

	if err := h.event.TerminateClub(ctx, cmd.ClubId, cmd.Principal.AccountId()); err != nil {
		return nil, err
	}

	return clb, nil
}
