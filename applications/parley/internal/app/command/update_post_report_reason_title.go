package command

import (
	"context"
	"overdoll/applications/parley/internal/domain/report"
	"overdoll/libraries/principal"
)

type UpdatePostReportReasonTitle struct {
	Principal      *principal.Principal
	ReportReasonId string
	Title          string
	Locale         string
}

type UpdatePostReportReasonTitleHandler struct {
	rr report.Repository
}

func NewUpdatePostReportReasonTitleHandler(rr report.Repository) UpdatePostReportReasonTitleHandler {
	return UpdatePostReportReasonTitleHandler{rr: rr}
}

func (h UpdatePostReportReasonTitleHandler) Handle(ctx context.Context, cmd UpdatePostReportReasonTitle) (*report.PostReportReason, error) {

	postReportReason, err := h.rr.UpdatePostReportReasonTitle(ctx, cmd.ReportReasonId, func(postReportReason *report.PostReportReason) error {
		return postReportReason.UpdateTitle(cmd.Principal, cmd.Title, cmd.Locale)
	})

	if err != nil {
		return nil, err
	}

	return postReportReason, nil
}
