package command

import (
	"context"
	"overdoll/applications/stella/internal/domain/club"
	"overdoll/applications/stella/internal/domain/event"
	"time"
)

type SuspendClubOperator struct {
	ClubId    string
	AccountId *string
	EndTime   time.Time
	Reason    string
}

type SuspendClubOperatorHandler struct {
	cr    club.Repository
	event event.Repository
}

func NewSuspendClubOperatorHandler(cr club.Repository, event event.Repository) SuspendClubOperatorHandler {
	return SuspendClubOperatorHandler{cr: cr, event: event}
}

func (h SuspendClubOperatorHandler) Handle(ctx context.Context, cmd SuspendClubOperator) error {

	clb, err := h.cr.GetClubById(ctx, cmd.ClubId)

	if err != nil {
		return err
	}

	if err := h.event.SuspendClubOperator(ctx, clb, cmd.AccountId, cmd.EndTime, cmd.Reason); err != nil {
		return err
	}

	return nil
}
