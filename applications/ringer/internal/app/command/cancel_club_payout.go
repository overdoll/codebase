package command

import (
	"context"
	"overdoll/applications/ringer/internal/domain/event"
	"overdoll/applications/ringer/internal/domain/payout"
	"overdoll/libraries/principal"
)

type CancelClubPayout struct {
	Principal *principal.Principal
	PayoutId  string
}

type CancelClubPayoutHandler struct {
	par   payout.Repository
	event event.Repository
}

func NewCancelClubPayoutHandler(par payout.Repository, event event.Repository) CancelClubPayoutHandler {
	return CancelClubPayoutHandler{par: par, event: event}
}

func (h CancelClubPayoutHandler) Handle(ctx context.Context, cmd CancelClubPayout) error {

	pay, err := h.par.GetClubPayoutById(ctx, cmd.Principal, cmd.PayoutId)

	if err != nil {
		return err
	}

	if err := pay.CanCancel(); err != nil {
		return err
	}

	return h.event.CancelClubPayout(ctx, cmd.PayoutId)
}