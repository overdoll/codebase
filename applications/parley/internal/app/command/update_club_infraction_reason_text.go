package command

import (
	"context"
	"overdoll/applications/parley/internal/domain/club_infraction"
	"overdoll/libraries/principal"
)

type UpdateClubInfractionReasonText struct {
	Principal          *principal.Principal
	InfractionReasonId string
	Reason             string
	Locale             string
}

type UpdateClubInfractionReasonTextHandler struct {
	cr club_infraction.Repository
}

func NewUpdateClubInfractionReasonTextHandler(cr club_infraction.Repository) UpdateClubInfractionReasonTextHandler {
	return UpdateClubInfractionReasonTextHandler{cr: cr}
}

func (h UpdateClubInfractionReasonTextHandler) Handle(ctx context.Context, cmd UpdateClubInfractionReasonText) (*club_infraction.ClubInfractionReason, error) {

	clubInfractionReason, err := h.cr.UpdateClubInfractionReasonText(ctx, cmd.InfractionReasonId, func(clubInfractionReason *club_infraction.ClubInfractionReason) error {
		return clubInfractionReason.UpdateReason(cmd.Principal, cmd.Reason, cmd.Locale)
	})

	if err != nil {
		return nil, err
	}

	return clubInfractionReason, nil
}
