package command

import (
	"context"
	"overdoll/applications/stella/internal/domain/club"
)

type DeleteAndRecreateClubsIndexHandler struct {
	cr club.Repository
}

func NewDeleteAndRecreateClubsIndex(cr club.Repository) DeleteAndRecreateClubsIndexHandler {
	return DeleteAndRecreateClubsIndexHandler{cr: cr}
}

func (h DeleteAndRecreateClubsIndexHandler) Handle(ctx context.Context) error {
	return h.cr.DeleteAndRecreateClubsIndex(ctx)
}
