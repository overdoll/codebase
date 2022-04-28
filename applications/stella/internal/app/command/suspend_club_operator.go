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
}

func NewSuspendClubOperatorHandler(cr club.Repository) SuspendClubOperatorHandler {
	return SuspendClubOperatorHandler{cr: cr}
}

func (h SuspendClubOperatorHandler) Handle(ctx context.Context, cmd SuspendClubOperator) error {

	_, err := h.cr.UpdateClubSuspensionStatus(ctx, cmd.ClubId, func(club *club.Club) error {
		return club.SuspendOperator(cmd.EndTime)
	})

	if err != nil {
		return err
	}

	return nil
}
