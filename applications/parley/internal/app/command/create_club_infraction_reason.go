package command

import (
	"context"
	"overdoll/applications/parley/internal/domain/club_infraction"
	"overdoll/libraries/principal"
)

type CreateClubInfractionReason struct {
	Principal *principal.Principal
	Reason    string
}

type CreateClubInfractionReasonHandler struct {
	cr club_infraction.Repository
}

func NewCreateClubInfractionReasonHandler(cr club_infraction.Repository) CreateClubInfractionReasonHandler {
	return CreateClubInfractionReasonHandler{cr: cr}
}

func (h CreateClubInfractionReasonHandler) Handle(ctx context.Context, cmd CreateClubInfractionReason) (*club_infraction.ClubInfractionReason, error) {

	clubInfractionReason, err := club_infraction.NewClubInfractionReason(
		cmd.Principal,
		cmd.Reason,
	)

	if err != nil {
		return nil, err
	}

	if err := h.cr.CreateClubInfractionReason(ctx, clubInfractionReason); err != nil {
		return nil, err
	}

	return clubInfractionReason, nil
}
