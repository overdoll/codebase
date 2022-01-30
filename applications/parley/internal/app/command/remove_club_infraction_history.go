package command

import (
	"context"
	"overdoll/applications/parley/internal/domain/club_infraction"
	"overdoll/libraries/principal"
)

type RemoveClubInfractionHistory struct {
	Principal *principal.Principal
	ClubId    string
	HistoryId string
}

type RemoveClubInfractionHistoryHandler struct {
	cr club_infraction.Repository
}

func NewRemoveClubInfractionHistoryHandler(cr club_infraction.Repository) RemoveClubInfractionHistoryHandler {
	return RemoveClubInfractionHistoryHandler{cr: cr}
}

func (h RemoveClubInfractionHistoryHandler) Handle(ctx context.Context, cmd RemoveClubInfractionHistory) error {

	clubInfractionHistory, err := h.cr.GetClubInfractionHistoryById(ctx, cmd.Principal, cmd.ClubId, cmd.HistoryId)

	if err != nil {
		return err
	}

	if err := h.cr.DeleteClubInfractionHistory(ctx, cmd.Principal, clubInfractionHistory); err != nil {
		return err
	}

	return nil
}
