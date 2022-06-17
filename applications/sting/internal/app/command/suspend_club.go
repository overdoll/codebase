package command

import (
	"context"
	"overdoll/applications/sting/internal/domain/club"
	"overdoll/applications/sting/internal/domain/event"
	"overdoll/libraries/principal"
	"time"
)

type SuspendClub struct {
	Principal *principal.Principal
	ClubId    string
	EndTime   time.Time
}

type SuspendClubHandler struct {
	cr    club.Repository
	event event.Repository
}

func NewSuspendClubHandler(cr club.Repository, event event.Repository) SuspendClubHandler {
	return SuspendClubHandler{cr: cr, event: event}
}

func (h SuspendClubHandler) Handle(ctx context.Context, cmd SuspendClub) (*club.Club, error) {

	clb, err := h.cr.GetClubById(ctx, cmd.ClubId)

	if err != nil {
		return nil, err
	}

	if err := h.event.SuspendClub(ctx, cmd.Principal, clb, cmd.EndTime, club.Manual.String()); err != nil {
		return nil, err
	}

	return clb, nil
}
