package command

import (
	"context"
	"overdoll/applications/parley/internal/domain/report"
	"overdoll/libraries/principal"
)

type UpdatePostReportReasonDeprecated struct {
	Principal      *principal.Principal
	ReportReasonId string
	Deprecated     bool
}

type UpdatePostReportReasonDeprecatedHandler struct {
	rr report.Repository
}

func NewUpdatePostReportReasonDeprecatedHandler(rr report.Repository) UpdatePostReportReasonDeprecatedHandler {
	return UpdatePostReportReasonDeprecatedHandler{rr: rr}
}

func (h UpdatePostReportReasonDeprecatedHandler) Handle(ctx context.Context, cmd UpdatePostReportReasonDeprecated) (*report.PostReportReason, error) {

	postReportReason, err := h.rr.UpdatePostReportReasonDeprecated(ctx, cmd.ReportReasonId, func(postReportReason *report.PostReportReason) error {
		return postReportReason.UpdateDeprecated(cmd.Principal, cmd.Deprecated)
	})

	if err != nil {
		return nil, err
	}

	return postReportReason, nil
}
