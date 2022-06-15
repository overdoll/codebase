package command

import (
	"context"
	"overdoll/applications/sting/internal/domain/club"
	"overdoll/applications/sting/internal/domain/event"
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

	if err := h.event.UnTerminateClub(ctx, cmd.Principal, clb); err != nil {
		return nil, err
	}

	return clb, nil
}
