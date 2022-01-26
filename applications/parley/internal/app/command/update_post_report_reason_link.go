package command

import (
	"context"
	"overdoll/applications/parley/internal/domain/report"
	"overdoll/libraries/principal"
)

type UpdatePostReportReasonLink struct {
	Principal      *principal.Principal
	ReportReasonId string
	Link           *string
}

type UpdatePostReportReasonLinkHandler struct {
	rr report.Repository
}

func NewUpdatePostReportReasonLinkHandler(rr report.Repository) UpdatePostReportReasonLinkHandler {
	return UpdatePostReportReasonLinkHandler{rr: rr}
}

func (h UpdatePostReportReasonLinkHandler) Handle(ctx context.Context, cmd UpdatePostReportReasonLink) (*report.PostReportReason, error) {

	postReportReason, err := h.rr.UpdatePostReportReasonLink(ctx, cmd.ReportReasonId, func(postReportReason *report.PostReportReason) error {
		return postReportReason.UpdateLink(cmd.Principal, cmd.Link)
	})

	if err != nil {
		return nil, err
	}

	return postReportReason, nil
}
