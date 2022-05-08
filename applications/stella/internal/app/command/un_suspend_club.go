package command

import (
	"context"
	"overdoll/applications/stella/internal/domain/club"
	"overdoll/applications/stella/internal/domain/event"

	"overdoll/libraries/principal"
)

type UnSuspendClub struct {
	Principal *principal.Principal
	ClubId    string
}

type UnSuspendClubHandler struct {
	cr    club.Repository
	event event.Repository
}

func NewUnSuspendClubHandler(cr club.Repository, event event.Repository) UnSuspendClubHandler {
	return UnSuspendClubHandler{cr: cr, event: event}
}

func (h UnSuspendClubHandler) Handle(ctx context.Context, cmd UnSuspendClub) (*club.Club, error) {

	clb, err := h.cr.GetClubById(ctx, cmd.ClubId)

	if err != nil {
		return nil, err
	}

	if err := clb.CanUnSuspend(cmd.Principal); err != nil {
		return nil, err
	}

	if err := h.event.UnSuspendClub(ctx, cmd.ClubId, cmd.Principal.AccountId()); err != nil {
		return nil, err
	}

	return clb, nil
}
