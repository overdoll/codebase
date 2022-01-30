package query

import (
	"context"

	"overdoll/applications/parley/internal/domain/club_infraction"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
)

type ClubInfractionHistory struct {
	Principal *principal.Principal
	Cursor    *paging.Cursor
	ClubId    string
}

type ClubInfractionHistoryByAccountHandler struct {
	cr club_infraction.Repository
}

func NewClubInfractionHistoryByAccountHandler(cr club_infraction.Repository) ClubInfractionHistoryByAccountHandler {
	return ClubInfractionHistoryByAccountHandler{cr: cr}
}

func (h ClubInfractionHistoryByAccountHandler) Handle(ctx context.Context, query ClubInfractionHistory) ([]*club_infraction.ClubInfractionHistory, error) {

	history, err := h.cr.GetClubInfractionHistoryByClubId(ctx, query.Principal, query.Cursor, query.ClubId)

	if err != nil {
		return nil, err
	}

	return history, nil
}
