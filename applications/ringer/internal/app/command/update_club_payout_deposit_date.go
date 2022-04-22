package command

import (
	"context"
	"overdoll/applications/ringer/internal/domain/event"
	"overdoll/applications/ringer/internal/domain/payout"
	"overdoll/libraries/principal"
	"time"
)

type UpdateClubPayoutDepositDate struct {
	Principal *principal.Principal
	PayoutId  string
	NewDate   time.Time
}

type UpdateClubPayoutDepositDateHandler struct {
	par   payout.Repository
	event event.Repository
}

func NewUpdateClubPayoutDepositDateHandler(par payout.Repository, event event.Repository) UpdateClubPayoutDepositDateHandler {
	return UpdateClubPayoutDepositDateHandler{par: par, event: event}
}

func (h UpdateClubPayoutDepositDateHandler) Handle(ctx context.Context, cmd UpdateClubPayoutDepositDate) (*payout.ClubPayout, error) {

	pay, err := h.par.GetClubPayoutById(ctx, cmd.Principal, cmd.PayoutId)

	if err != nil {
		return nil, err
	}

	if err := pay.CanUpdateDepositDate(cmd.Principal); err != nil {
		return nil, err
	}

	if err := h.event.UpdateClubPayoutDepositDate(ctx, pay, cmd.NewDate); err != nil {
		return nil, err
	}

	return pay, nil
}
