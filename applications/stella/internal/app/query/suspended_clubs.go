package query

import (
	"context"
	"overdoll/applications/stella/internal/domain/club"
)

type SuspendedClubsHandler struct {
	cr club.IndexRepository
}

func NewSuspendedClubsHandler(cr club.IndexRepository) SuspendedClubsHandler {
	return SuspendedClubsHandler{cr: cr}
}

func (h SuspendedClubsHandler) Handle(ctx context.Context) ([]*club.Club, error) {

	results, err := h.cr.SuspendedClubs(ctx)

	if err != nil {
		return nil, err
	}

	return results, nil
}
