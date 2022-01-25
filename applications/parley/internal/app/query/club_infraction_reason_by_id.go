package query

import (
	"context"

	"overdoll/applications/parley/internal/domain/club_infraction"
	"overdoll/libraries/principal"
)

type ClubInfractionReasonById struct {
	Principal *principal.Principal
	ReasonId  string
}

type ClubInfractionReasonByIdHandler struct {
	cr club_infraction.Repository
}

func NewClubInfractionReasonByIdHandler(cr club_infraction.Repository) ClubInfractionReasonByIdHandler {
	return ClubInfractionReasonByIdHandler{cr: cr}
}

func (h ClubInfractionReasonByIdHandler) Handle(ctx context.Context, query ClubInfractionReasonById) (*club_infraction.ClubInfractionReason, error) {

	infractionHistory, err := h.cr.GetClubInfractionReasonById(ctx, query.Principal, query.ReasonId)

	if err != nil {
		return nil, err
	}

	return infractionHistory, nil
}
