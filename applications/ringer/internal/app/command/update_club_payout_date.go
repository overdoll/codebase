package command

import (
	"context"
	"overdoll/applications/ringer/internal/domain/event"
	"overdoll/applications/ringer/internal/domain/payout"
	"overdoll/libraries/principal"
)

type UpdateClubPayoutDate struct {
	Principal *principal.Principal
	PayoutId  string
}

type UpdateClubPayoutDateHandler struct {
	par   payout.Repository
	event event.Repository
}

func NewUpdateClubPayoutDateHandler(par payout.Repository, event event.Repository) UpdateClubPayoutDateHandler {
	return UpdateClubPayoutDateHandler{par: par, event: event}
}

func (h UpdateClubPayoutDateHandler) Handle(ctx context.Context, cmd UpdateClubPayoutDate) error {

	pay, err := h.par.GetClubPayoutById(ctx, cmd.Principal, cmd.PayoutId)

	if err != nil {
		return err
	}

	if err := pay.CanUpdateDate(cmd.Principal); err != nil {
		return err
	}

	return h.event.UpdateClubPayoutDate(ctx, pay)
}
