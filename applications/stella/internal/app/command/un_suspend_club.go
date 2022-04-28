package command

import (
	"context"
	"overdoll/applications/stella/internal/domain/club"

	"overdoll/libraries/principal"
)

type UnSuspendClub struct {
	Principal *principal.Principal
	ClubId    string
}

type UnSuspendClubHandler struct {
	cr club.Repository
}

func NewUnSuspendClubHandler(cr club.Repository) UnSuspendClubHandler {
	return UnSuspendClubHandler{cr: cr}
}

func (h UnSuspendClubHandler) Handle(ctx context.Context, cmd UnSuspendClub) (*club.Club, error) {

	clb, err := h.cr.UpdateClubSuspensionStatus(ctx, cmd.ClubId, func(club *club.Club) error {
		return club.UnSuspend(cmd.Principal)
	})

	if err != nil {
		return nil, err
	}

	return clb, nil
}
