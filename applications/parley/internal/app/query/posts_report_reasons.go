package query

import (
	"context"

	"overdoll/applications/parley/internal/domain/report"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
)

type PostsReportReasons struct {
	Principal *principal.Principal
	Cursor    *paging.Cursor
}

type PostsReportReasonsHandler struct {
	rr report.Repository
}

func NewPostReportReasonsHandler(rr report.Repository) PostsReportReasonsHandler {
	return PostsReportReasonsHandler{rr: rr}
}

func (h PostsReportReasonsHandler) Handle(ctx context.Context, query PostsReportReasons) ([]*report.PostReportReason, error) {

	reasons, err := h.rr.GetPostReportReasons(ctx, query.Principal, query.Cursor)

	if err != nil {
		return nil, err
	}

	return reasons, nil
}
