package command

import (
	"context"
	"overdoll/applications/stella/internal/domain/club"
	"overdoll/applications/stella/internal/domain/event"
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

	if err := clb.CanSuspend(cmd.Principal); err != nil {
		return nil, err
	}

	accountRequester := cmd.Principal.AccountId()

	if err := h.event.SuspendClub(ctx, cmd.ClubId, &accountRequester, cmd.EndTime, club.Manual.String()); err != nil {
		return nil, err
	}

	return clb, nil
}
