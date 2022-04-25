package command

import (
	"context"
	"overdoll/applications/ringer/internal/domain/event"
	"overdoll/applications/ringer/internal/domain/payout"
	"overdoll/libraries/principal"
	"time"
)

type InitiateClubPayout struct {
	Principal   *principal.Principal
	ClubId      string
	DepositDate *time.Time
}

type InitiateClubPayoutHandler struct {
	par   payout.Repository
	event event.Repository
}

func NewInitiateClubPayoutHandler(par payout.Repository, event event.Repository) InitiateClubPayoutHandler {
	return InitiateClubPayoutHandler{par: par, event: event}
}

func (h InitiateClubPayoutHandler) Handle(ctx context.Context, cmd InitiateClubPayout) error {

	if err := h.par.CanInitiateClubPayout(ctx, cmd.Principal, cmd.ClubId); err != nil {
		return err
	}

	return h.event.InitiateClubPayout(ctx, cmd.ClubId, cmd.DepositDate)
}
