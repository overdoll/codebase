package command

import (
	"context"
	"overdoll/applications/ringer/internal/domain/event"
	"overdoll/applications/ringer/internal/domain/payout"
	"overdoll/libraries/principal"
)

type RetryClubPayout struct {
	Principal *principal.Principal
	PayoutId  string
}

type RetryClubPayoutHandler struct {
	par   payout.Repository
	event event.Repository
}

func NewRetryClubPayoutHandler(par payout.Repository, event event.Repository) RetryClubPayoutHandler {
	return RetryClubPayoutHandler{par: par, event: event}
}

func (h RetryClubPayoutHandler) Handle(ctx context.Context, cmd RetryClubPayout) error {

	pay, err := h.par.GetClubPayoutById(ctx, cmd.Principal, cmd.PayoutId)

	if err != nil {
		return err
	}

	if err := pay.CanRetry(); err != nil {
		return err
	}

	return h.event.RetryClubPayout(ctx, cmd.PayoutId)
}
