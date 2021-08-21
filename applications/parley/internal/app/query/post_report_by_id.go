package query

import (
	"context"

	"overdoll/applications/parley/internal/domain/report"
	"overdoll/libraries/principal"
)

type PostReportById struct {
	Principal *principal.Principal

	Id string
}

type PostReportByIdHandler struct {
	rr report.Repository
}

func NewPostReportByIdHandler(rr report.Repository) PostReportByIdHandler {
	return PostReportByIdHandler{rr: rr}
}

func (h PostReportByIdHandler) Handle(ctx context.Context, query PostReportById) (*report.PostReport, error) {

	postReport, err := h.rr.GetPostReport(ctx, query.Principal, query.Id)

	if err != nil {
		return nil, err
	}

	return postReport, nil
}
