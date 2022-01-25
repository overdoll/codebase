package command

import (
	"context"
	"overdoll/applications/stella/internal/domain/club"
	"time"
)

type SuspendClub struct {
	ClubId  string
	EndTime time.Time
}

type SuspendClubHandler struct {
	cr club.Repository
	ci club.IndexRepository
}

func NewSuspendClubHandler(cr club.Repository, ci club.IndexRepository) SuspendClubHandler {
	return SuspendClubHandler{cr: cr, ci: ci}
}

func (h SuspendClubHandler) Handle(ctx context.Context, cmd SuspendClub) error {

	_, err := h.cr.UpdateClubSuspensionStatus(ctx, cmd.ClubId, func(club *club.Club) error {
		return club.Suspend(cmd.EndTime)
	})

	if err != nil {
		return err
	}

	return nil
}
