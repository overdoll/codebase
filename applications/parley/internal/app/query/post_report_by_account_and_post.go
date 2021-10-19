package query

import (
	"context"

	"overdoll/applications/parley/internal/domain/report"
	"overdoll/libraries/principal"
)

type PostReportByAccountAndPost struct {
	Principal *principal.Principal
	PostId    string
}

type PostReportByAccountAndPostHandler struct {
	rr report.Repository
}

func NewPostReportByAccountAndPostHandler(rr report.Repository) PostReportByAccountAndPostHandler {
	return PostReportByAccountAndPostHandler{rr: rr}
}

func (h PostReportByAccountAndPostHandler) Handle(ctx context.Context, query PostReportByAccountAndPost) (*report.PostReport, error) {

	postReport, err := h.rr.GetPostReportForAccount(ctx, query.Principal, query.PostId, query.Principal.AccountId())

	if err != nil {
		return nil, err
	}

	return postReport, nil
}
