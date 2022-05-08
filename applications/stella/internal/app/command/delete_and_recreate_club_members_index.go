package command

import (
	"context"
	"overdoll/applications/stella/internal/domain/club"
)

type DeleteAndRecreateClubMembersIndexHandler struct {
	cr club.Repository
}

func NewDeleteAndRecreateClubMembersIndexHandler(cr club.Repository) DeleteAndRecreateClubMembersIndexHandler {
	return DeleteAndRecreateClubMembersIndexHandler{cr: cr}
}

func (h DeleteAndRecreateClubMembersIndexHandler) Handle(ctx context.Context) error {
	return h.cr.DeleteAndRecreateClubMembersIndex(ctx)
}
