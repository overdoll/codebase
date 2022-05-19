package query

import (
	"context"

	"overdoll/applications/parley/internal/domain/report"
	"overdoll/libraries/principal"
)

type PostReportById struct {
	Principal *principal.Principal
	AccountId string
	PostId    string
}

type PostReportByIdHandler struct {
	rr report.Repository
}

func NewPostReportByIdHandler(rr report.Repository) PostReportByIdHandler {
	return PostReportByIdHandler{rr: rr}
}

func (h PostReportByIdHandler) Handle(ctx context.Context, query PostReportById) (*report.PostReport, error) {

	postReport, err := h.rr.GetPostReportById(ctx, query.Principal, query.PostId, query.AccountId)

	if err != nil {
		return nil, err
	}

	return postReport, nil
}
