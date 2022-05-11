package command

import (
	"context"
	"overdoll/applications/parley/internal/domain/report"
)

type DeleteAndRecreatePostReportsIndexHandler struct {
	rr report.Repository
}

func NewDeleteAndRecreateClubMembersIndexHandler(rr report.Repository) DeleteAndRecreatePostReportsIndexHandler {
	return DeleteAndRecreatePostReportsIndexHandler{rr: rr}
}

func (h DeleteAndRecreatePostReportsIndexHandler) Handle(ctx context.Context) error {
	return h.rr.DeleteAndRecreatePostReportsIndex(ctx)
}
