package command

import (
	"context"
	"overdoll/applications/parley/internal/domain/report"
	"overdoll/libraries/principal"
)

type CreatePostReportReason struct {
	Principal   *principal.Principal
	Title       string
	Description string
	Link        *string
}

type CreatePostReportReasonHandler struct {
	rr report.Repository
}

func NewCreatePostReportReasonHandler(rr report.Repository) CreatePostReportReasonHandler {
	return CreatePostReportReasonHandler{rr: rr}
}

func (h CreatePostReportReasonHandler) Handle(ctx context.Context, cmd CreatePostReportReason) (*report.PostReportReason, error) {

	postReportReason, err := report.NewPostReportReason(
		cmd.Principal,
		cmd.Title,
		cmd.Description,
		cmd.Link,
	)

	if err != nil {
		return nil, err
	}

	if err := h.rr.CreatePostReportReason(ctx, postReportReason); err != nil {
		return nil, err
	}

	return postReportReason, nil
}
