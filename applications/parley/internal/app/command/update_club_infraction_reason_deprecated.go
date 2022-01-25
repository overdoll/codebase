package command

import (
	"context"
	"overdoll/applications/parley/internal/domain/club_infraction"
	"overdoll/libraries/principal"
)

type UpdateClubInfractionReasonDeprecated struct {
	Principal          *principal.Principal
	InfractionReasonId string
	Deprecated         bool
}

type UpdateClubInfractionReasonDeprecatedHandler struct {
	cr club_infraction.Repository
}

func NewUpdateClubInfractionReasonDeprecatedHandler(cr club_infraction.Repository) UpdateClubInfractionReasonDeprecatedHandler {
	return UpdateClubInfractionReasonDeprecatedHandler{cr: cr}
}

func (h UpdateClubInfractionReasonDeprecatedHandler) Handle(ctx context.Context, cmd UpdateClubInfractionReasonDeprecated) (*club_infraction.ClubInfractionReason, error) {

	clubInfractionReason, err := h.cr.UpdateClubInfractionReasonDeprecated(ctx, cmd.InfractionReasonId, func(clubInfractionReason *club_infraction.ClubInfractionReason) error {
		return clubInfractionReason.UpdateDeprecated(cmd.Principal, cmd.Deprecated)
	})

	if err != nil {
		return nil, err
	}

	return clubInfractionReason, nil
}
