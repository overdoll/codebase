package command

import (
	"context"
	"overdoll/applications/ringer/internal/domain/event"
	"overdoll/applications/ringer/internal/domain/payout"
	"overdoll/libraries/principal"
)

type DelayClubPayout struct {
	Principal *principal.Principal
	PayoutId  string
}

type DelayClubPayoutHandler struct {
	par   payout.Repository
	event event.Repository
}

func NewDelayClubPayoutHandler(par payout.Repository, event event.Repository) DelayClubPayoutHandler {
	return DelayClubPayoutHandler{par: par, event: event}
}

func (h DelayClubPayoutHandler) Handle(ctx context.Context, cmd DelayClubPayout) error {

	pay, err := h.par.GetClubPayoutById(ctx, cmd.Principal, cmd.PayoutId)

	if err != nil {
		return err
	}

	if err := pay.CanDelay(); err != nil {
		return err
	}

	return h.event.DelayClubPayout(ctx, pay)
}
