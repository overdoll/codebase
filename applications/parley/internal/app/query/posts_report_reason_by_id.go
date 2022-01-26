package query

import (
	"context"

	"overdoll/applications/parley/internal/domain/report"
	"overdoll/libraries/principal"
)

type PostReportReasonById struct {
	Principal      *principal.Principal
	ReportReasonId string
}

type PostReportReasonByIdHandler struct {
	rr report.Repository
}

func NewPostsReportReasonByIdHandler(rr report.Repository) PostReportReasonByIdHandler {
	return PostReportReasonByIdHandler{rr: rr}
}

func (h PostReportReasonByIdHandler) Handle(ctx context.Context, query PostReportReasonById) (*report.PostReportReason, error) {

	reason, err := h.rr.GetPostReportReasonById(ctx, query.Principal, query.ReportReasonId)

	if err != nil {
		return nil, err
	}

	return reason, nil
}
