package command

import (
	"context"
	"overdoll/applications/parley/internal/domain/club_infraction"
	"overdoll/libraries/principal"
)

type UpdateClubInfractionReasonTitle struct {
	Principal          *principal.Principal
	InfractionReasonId string
	Title              string
	Locale             string
}

type UpdateClubInfractionReasonTitleHandler struct {
	cr club_infraction.Repository
}

func NewUpdateClubInfractionReasonTitleHandler(cr club_infraction.Repository) UpdateClubInfractionReasonTitleHandler {
	return UpdateClubInfractionReasonTitleHandler{cr: cr}
}

func (h UpdateClubInfractionReasonTitleHandler) Handle(ctx context.Context, cmd UpdateClubInfractionReasonTitle) (*club_infraction.ClubInfractionReason, error) {

	clubInfractionReason, err := h.cr.UpdateClubInfractionReasonTitle(ctx, cmd.InfractionReasonId, func(clubInfractionReason *club_infraction.ClubInfractionReason) error {
		return clubInfractionReason.UpdateTitle(cmd.Principal, cmd.Title, cmd.Locale)
	})

	if err != nil {
		return nil, err
	}

	return clubInfractionReason, nil
}
