package command

import (
	"context"
	"overdoll/applications/parley/internal/domain/club_infraction"
	"overdoll/libraries/principal"
)

type UpdateClubInfractionReasonDescription struct {
	Principal          *principal.Principal
	InfractionReasonId string
	Description        string
	Locale             string
}

type UpdateClubInfractionReasonDescriptionHandler struct {
	cr club_infraction.Repository
}

func NewUpdateClubInfractionReasonDescriptionHandler(cr club_infraction.Repository) UpdateClubInfractionReasonDescriptionHandler {
	return UpdateClubInfractionReasonDescriptionHandler{cr: cr}
}

func (h UpdateClubInfractionReasonDescriptionHandler) Handle(ctx context.Context, cmd UpdateClubInfractionReasonDescription) (*club_infraction.ClubInfractionReason, error) {

	clubInfractionReason, err := h.cr.UpdateClubInfractionReasonDescription(ctx, cmd.InfractionReasonId, func(clubInfractionReason *club_infraction.ClubInfractionReason) error {
		return clubInfractionReason.UpdateDescription(cmd.Principal, cmd.Description, cmd.Locale)
	})

	if err != nil {
		return nil, err
	}

	return clubInfractionReason, nil
}
