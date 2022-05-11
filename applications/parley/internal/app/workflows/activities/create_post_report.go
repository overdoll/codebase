package activities

import (
	"context"
	"overdoll/applications/parley/internal/domain/report"
	"time"
)

type CreatePostReportInput struct {
	AccountId string
	PostId    string
	RuleId    string
	CreatedAt time.Time
}

func (h *Activities) CreatePostReport(ctx context.Context, input CreatePostReportInput) error {

	postReport := report.UnmarshalPostReportFromDatabase(
		input.PostId,
		input.AccountId,
		input.RuleId,
		input.CreatedAt,
	)

	// create post report record
	if err := h.rpr.CreatePostReport(ctx, postReport); err != nil {
		return err
	}

	return nil
}
