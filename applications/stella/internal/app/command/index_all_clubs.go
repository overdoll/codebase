package command

import (
	"context"
	"overdoll/applications/stella/internal/domain/club"
)

type IndexAllClubsHandler struct {
	cr club.Repository
	ci club.IndexRepository
}

func NewIndexAllClubsHandler(cr club.Repository, ci club.IndexRepository) IndexAllClubsHandler {
	return IndexAllClubsHandler{cr: cr, ci: ci}
}

func (h IndexAllClubsHandler) Handle(ctx context.Context) error {

	if err := h.ci.DeleteClubsIndex(ctx); err != nil {
		return err
	}

	return h.ci.IndexAllClubs(ctx)
}
