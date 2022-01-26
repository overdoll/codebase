package command

import (
	"context"
	"overdoll/applications/stella/internal/domain/club"
	"overdoll/libraries/principal"
	"time"
)

type SuspendClub struct {
	Principal *principal.Principal
	ClubId    string
	EndTime   time.Time
}

type SuspendClubHandler struct {
	cr club.Repository
	ci club.IndexRepository
}

func NewSuspendClubHandler(cr club.Repository, ci club.IndexRepository) SuspendClubHandler {
	return SuspendClubHandler{cr: cr, ci: ci}
}

func (h SuspendClubHandler) Handle(ctx context.Context, cmd SuspendClub) (*club.Club, error) {

	clb, err := h.cr.UpdateClubSuspensionStatus(ctx, cmd.ClubId, func(club *club.Club) error {
		return club.Suspend(cmd.Principal, cmd.EndTime)
	})

	if err != nil {
		return nil, err
	}

	if err := h.ci.IndexClub(ctx, clb); err != nil {
		return nil, err
	}

	return clb, nil
}
