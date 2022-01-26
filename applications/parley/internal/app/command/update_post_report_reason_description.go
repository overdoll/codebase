package command

import (
	"context"
	"overdoll/applications/parley/internal/domain/report"
	"overdoll/libraries/principal"
)

type UpdatePostReportReasonDescription struct {
	Principal      *principal.Principal
	ReportReasonId string
	Description    string
	Locale         string
}

type UpdatePostReportReasonDescriptionHandler struct {
	rr report.Repository
}

func NewUpdatePostReportReasonDescriptionHandler(rr report.Repository) UpdatePostReportReasonDescriptionHandler {
	return UpdatePostReportReasonDescriptionHandler{rr: rr}
}

func (h UpdatePostReportReasonDescriptionHandler) Handle(ctx context.Context, cmd UpdatePostReportReasonDescription) (*report.PostReportReason, error) {

	postReportReason, err := h.rr.UpdatePostReportReasonDescription(ctx, cmd.ReportReasonId, func(postReportReason *report.PostReportReason) error {
		return postReportReason.UpdateDescription(cmd.Principal, cmd.Description, cmd.Locale)
	})

	if err != nil {
		return nil, err
	}

	return postReportReason, nil
}
