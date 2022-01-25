package query

import (
	"context"

	"overdoll/applications/parley/internal/domain/club_infraction"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
)

type ClubInfractionReasons struct {
	Principal  *principal.Principal
	Cursor     *paging.Cursor
	Deprecated bool
}

type ClubInfractionReasonsHandler struct {
	cr club_infraction.Repository
}

func NewClubInfractionReasonsHandler(cr club_infraction.Repository) ClubInfractionReasonsHandler {
	return ClubInfractionReasonsHandler{cr: cr}
}

func (h ClubInfractionReasonsHandler) Handle(ctx context.Context, query ClubInfractionReasons) ([]*club_infraction.ClubInfractionReason, error) {

	reasons, err := h.cr.GetClubInfractionReasons(ctx, query.Principal, query.Cursor, query.Deprecated)

	if err != nil {
		return nil, err
	}

	return reasons, nil
}
