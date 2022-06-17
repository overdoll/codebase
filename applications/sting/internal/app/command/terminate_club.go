package command

import (
	"context"
	"overdoll/applications/sting/internal/domain/club"
	"overdoll/applications/sting/internal/domain/event"
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

	if err := h.event.TerminateClub(ctx, cmd.Principal, clb); err != nil {
		return nil, err
	}

	return clb, nil
}
