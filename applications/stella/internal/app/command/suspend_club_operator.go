package command

import (
	"context"
	"overdoll/applications/stella/internal/domain/club"
	"time"
)

type SuspendClubOperator struct {
	ClubId  string
	EndTime time.Time
}

type SuspendClubOperatorHandler struct {
	cr club.Repository
	ci club.IndexRepository
}

func NewSuspendClubOperatorHandler(cr club.Repository, ci club.IndexRepository) SuspendClubOperatorHandler {
	return SuspendClubOperatorHandler{cr: cr, ci: ci}
}

func (h SuspendClubOperatorHandler) Handle(ctx context.Context, cmd SuspendClubOperator) error {

	clb, err := h.cr.UpdateClubSuspensionStatus(ctx, cmd.ClubId, func(club *club.Club) error {
		return club.SuspendOperator(cmd.EndTime)
	})

	if err != nil {
		return err
	}

	if err := h.ci.IndexClub(ctx, clb); err != nil {
		return err
	}

	return nil
}
