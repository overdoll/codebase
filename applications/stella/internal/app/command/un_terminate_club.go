package command

import (
	"context"
	"overdoll/applications/stella/internal/domain/club"
	"overdoll/applications/stella/internal/domain/event"
	"overdoll/libraries/principal"
)

type UnTerminateClub struct {
	Principal *principal.Principal
	ClubId    string
}

type UnTerminateClubHandler struct {
	cr    club.Repository
	event event.Repository
}

func NewUnTerminateClubHandler(cr club.Repository, event event.Repository) UnTerminateClubHandler {
	return UnTerminateClubHandler{cr: cr, event: event}
}

func (h UnTerminateClubHandler) Handle(ctx context.Context, cmd UnTerminateClub) (*club.Club, error) {

	clb, err := h.cr.GetClubById(ctx, cmd.ClubId)

	if err != nil {
		return nil, err
	}

	if err := clb.CanUnTerminate(cmd.Principal); err != nil {
		return nil, err
	}

	if err := h.event.UnTerminateClub(ctx, cmd.ClubId); err != nil {
		return nil, err
	}

	return clb, nil
}
