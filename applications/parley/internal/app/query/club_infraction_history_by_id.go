package query

import (
	"context"

	"overdoll/applications/parley/internal/domain/club_infraction"
	"overdoll/libraries/principal"
)

type ClubInfractionHistoryById struct {
	Principal    *principal.Principal
	ClubId       string
	InfractionId string
}

type ClubInfractionHistoryByIdHandler struct {
	cr club_infraction.Repository
}

func NewClubInfractionHistoryByIdHandler(cr club_infraction.Repository) ClubInfractionHistoryByIdHandler {
	return ClubInfractionHistoryByIdHandler{cr: cr}
}

func (h ClubInfractionHistoryByIdHandler) Handle(ctx context.Context, query ClubInfractionHistoryById) (*club_infraction.ClubInfractionHistory, error) {

	infractionHistory, err := h.cr.GetClubInfractionHistoryById(ctx, query.Principal, query.ClubId, query.InfractionId)

	if err != nil {
		return nil, err
	}

	return infractionHistory, nil
}
